package axl.stf.quixot.core.cli;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.io.*;
import java.util.*;

public class QuixotCompiler extends Option {


    public static Throwable saveToFile(String content, String outputPath) {
        Throwable r = null;
        BufferedWriter bufwr = null;

        try {
            bufwr = new BufferedWriter(new FileWriter(outputPath));
            bufwr.write(content);

        } catch (IOException e) {
            System.out.println(e);
            r = e;
        } finally {
            try {
                if (bufwr != null) {
                    bufwr.close();
                }
            } catch (IOException e) {
                r = e;
            }
        }
        return r;
    }

    private static class CPR{
        private final String file;
        private final String[] profiles;

        public  CPR(String file, String ... profiles){
            this.file = file;
            this.profiles = profiles;
        }


    }
    private static final List<CPR> in = new ArrayList<CPR>();


    static {
        String all = "quixot.js";
        String node = "quixot.node.js";
        String jvm = "quixot.jvm.js";
        String browser = "quixot.browser.js";

        in.add(new CPR("lib/000-engine-fix.js", all, node, jvm, browser));
        in.add(new CPR("lib/001-lib-header.js", all, node, jvm, browser));
        in.add(new CPR("lib/002-global-defs.js", all, node, jvm, browser));
        in.add(new CPR("lib/003-fingerprint-getters.js", all, node, jvm, browser));
        in.add(new CPR("lib/004-events.js", all, node, jvm, browser));
        in.add(new CPR("lib/004-time-utils.js", all, node, jvm, browser));
        in.add(new CPR("lib/005-utils.js", all, node, jvm, browser));
        in.add(new CPR("lib/006-canvas-gl.js", all, node, jvm, browser));
        in.add(new CPR("lib/007-require.js", all, node, jvm, browser));
        in.add(new CPR("lib/007-require.js", all, node, jvm, browser));
        in.add(new CPR("lib/008-url-utils.js", all, node, jvm, browser));
        in.add(new CPR("lib/009-logger.js", all, node, jvm, browser));
        in.add(new CPR("lib/010-cookie.js", all, node, jvm, browser));
        in.add(new CPR("lib/011-environment.js", all, node, jvm, browser));
        in.add(new CPR("lib/012-caching.js", all, node, jvm, browser));
        in.add(new CPR("lib/013-browser.js", all, node, jvm, browser));
        in.add(new CPR("lib/014-unit-testing.js", all, node, jvm, browser));
        in.add(new CPR("lib/015-tween.js", all, node, jvm, browser));
        in.add(new CPR("lib/016-html4notification.js", all, node, jvm, browser));
        in.add(new CPR("lib/016-html5notification.js", all, node, jvm, browser));
        in.add(new CPR("lib/016-node-notification.js", all, node, jvm, browser));
        in.add(new CPR("lib/016-xxx-mingui.js", all, node, jvm, browser));
        in.add(new CPR("lib/017-media.js", all, node, jvm, browser));
        in.add(new CPR("lib/018-rtc.js", all, node, jvm, browser));
        in.add(new CPR("lib/019-injectors.js", all, node, jvm, browser));

        in.add(new CPR("lib/020-http.js", all, node, jvm, browser));
        in.add(new CPR("lib/021-dulcineea.js", all, node, jvm, browser));
        in.add(new CPR("lib/022-gog.js", all, node, jvm, browser));


        in.add(new CPR("lib/xxx-lib-end.js", all, node, jvm, browser));


    }


    public QuixotCompiler() {
        super("--quixot-onDist");
    }


    public String getTestContent(){
        InputStream is = QuixotCompiler.class.getClassLoader().getResourceAsStream("lib/xxx-test.js");


        StringBuilder inputStringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;
        try {
            bufferedReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String line = null;
        try {
            line = bufferedReader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
        while(line != null){
            inputStringBuilder.append(line);inputStringBuilder.append('\n');
            try {
                line = bufferedReader.readLine();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

       return inputStringBuilder.toString();
    }

    public void distVersions(VersionHandler handler){

        Map<String, String> nms = new HashMap<String, String>();

        for(CPR c: in) {
            InputStream is = QuixotCompiler.class.getClassLoader().getResourceAsStream(c.file);
            String s = new Scanner(is).useDelimiter("\\Z").next();
            for (String k: c.profiles){
                if(nms.get(k) == null){
                    nms.put(k, s);
                } else {
                    String o = nms.get(k);
                    o+=s;
                    nms.put(k, o);
                }
            }
        }
        String quixotPackInfo = "var quixot_pack_info = { " +
                "buildTimestamp: " + System.currentTimeMillis() + "};";

        for (Map.Entry<String, String> e: nms.entrySet()) {
            String content =
                    "var quixot = (function(){\n"+  quixotPackInfo +
                            e.getValue()

                            + " return exportable;})();if(typeof module !='undefined') {" +
                            "module.exports = quixot" +
                            "}";

            handler.onDist(content, e);
        }
    }

    @Override
    public void exec() {
        if(!isValid()){
            return;
        }
        distVersions(new VersionHandler() {
            @Override
            public void onDist(String content, Map.Entry<String, String> version) {
                saveToFile(content, "onDist/" + version.getKey());

                ScriptEngine scriptEngine = new ScriptEngineManager().getEngineByName("nashorn");

                try {
                    scriptEngine.eval(content);
                } catch (ScriptException e1) {
                    e1.printStackTrace();
                }
            }
        });
    }

    public interface VersionHandler {
        void onDist(String content, Map.Entry<String, String> version);
    }
}

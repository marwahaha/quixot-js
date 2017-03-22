package axl.stf.quixot.core.cli;

import javax.script.ScriptEngine;
import javax.script.ScriptException;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;

public class RunOption extends Option {
    private final ScriptEngine engine;

    public RunOption(ScriptEngine engine) {
        super("--run", "<file>");
        this.engine = engine;
    }

    @Override
    public void exec() {
        if(!isValid()){
            return;
        }

//        ScriptEngineManager manager = new ScriptEngineManager();
//        ScriptEngine engine = manager.getEngineByName("nashorn");








//        ScriptContext scriptContext = new SimpleScriptContext();
//        scriptContext.setBindings(engine.createBindings(), ScriptContext.ENGINE_SCOPE);
//        scriptContext.setAttribute();
//        try {
////            engine.eval("test", scriptContext)
//        } catch (ScriptException e) {
//            e.printStackTrace();
//        }

        File file = new File(parameters.get(0));
        System.out.println(file.getAbsolutePath());

        try {
            engine.eval(new FileReader(file));
        } catch (ScriptException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }



    }
}

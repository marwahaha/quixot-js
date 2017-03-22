package axl.stf.quixot.core.cli;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;

/**
 * Created by Alexandru.Stefan on 3/8/2017.
 */
public class NodeGypBuilder {

    private final String root;
    private String srcDir;

    public NodeGypBuilder(String root){
        this.root = root;
    }

    public NodeGypBuilder include(String includeDir){
        return this;
    }

    public NodeGypBuilder sources(String srcDir){
        this.srcDir = srcDir;
        return this;
    }


    List<String> sources = new ArrayList<String>();
    public void scan(File f){
        if(f.isDirectory()){
            File[] faFiles = f.listFiles();
            for(File file: faFiles){
                if(file.isDirectory()){
                    scan(file);
                } else {
                    String s = file.getAbsolutePath()
                            .replaceAll( Matcher.quoteReplacement(root+ File.separator) , "")
                            .replaceAll(Matcher.quoteReplacement("\\"), Matcher.quoteReplacement("/"));
                    sources.add(s);
                }

            }
        }
        else {
            System.out.println(f.getAbsoluteFile());
        }

    }

    public String build(){

        sources.clear();
        scan(Paths.get(root, srcDir).toFile());

        StringBuffer stringBuffer = new StringBuffer();
//        stringBuffer.append("\n\"sources\":[\n");

        for (int i = 0; i < sources.size(); i++){
            if(i > 0){
                stringBuffer.append(",");
            }
            stringBuffer.append("\"" + sources.get(i) + "\"");
            stringBuffer.append("\n");
        }

        System.out.println(stringBuffer.toString());



        return stringBuffer.toString();
    }


}

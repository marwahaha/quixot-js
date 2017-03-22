package axl.stf.quixot;

import axl.stf.quixot.core.cli.*;

import java.util.ArrayList;
import java.util.List;


public class Main {


    public static void main(String[] args) {

//        new NodeGypBuilder("C:\\Users\\alexandru.stefan\\Downloads\\nana 1.4.1\\nana")
//                .include("include").sources("source").build();

//        new Tween(Easing.BASIC);
//
//
        List<Option> options = new ArrayList<>();
        options.add(new QuixotCompiler());
        options.add(new RunOption(new DesktopEngine().getInstance()));
//
//
        CommandLineParser commandLineParser =
                new CommandLineParser();
        commandLineParser.scanArgs(args, options);


        for (Option argument: options){
            argument.exec();
        }

    }


}

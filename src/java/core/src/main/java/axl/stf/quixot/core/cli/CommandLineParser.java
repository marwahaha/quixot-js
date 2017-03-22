package axl.stf.quixot.core.cli;

import java.util.List;

public class CommandLineParser {

    public final void scanArgs(String[] args, List<Option> argumentParsers){
        scanIndex(0, args, argumentParsers);
    }

    private void scanIndex(int index, String[] args,  List<Option> argumentParsers){
        int next = index + 1;

        System.out.println("scanIndex" + index);
        for(Option argument: argumentParsers){
            if (args[index].equals(argument.getCommand())){
                System.out.println("  found" + argument.getCommand());
                next = scanParam(argument, index, args);
                argument.setExist(true);
            }
        }

        if(next < args.length - 1){
            scanIndex(next, args, argumentParsers);
        }
    }

    private int scanParam(Option argumentAction, int index, String[] args){

        int next = index + 1;
        for (int i = index + 1; i < argumentAction.size() + index + 1; i++){
            System.out.println("       scanParam" + i + args[i]);
            argumentAction.addParam(args[i]);
            next++;
        }
        return next;
    }
}

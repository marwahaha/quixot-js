package axl.stf.quixot.core.cli;

import java.util.ArrayList;
import java.util.List;

public class Option {

    private final String command;
    private final String[] args;
    protected List<String> parameters = new ArrayList<String>();


    public boolean exist() {
        return pexist;
    }

    public void setExist(boolean exist) {
        this.pexist = exist;
    }

    private boolean pexist = false;

    public Option(String command, String ... args){
        this.command = command;
        this.args = args;
    }





    public int size() {
        return args.length;
    }

    public String getCommand() {
        return command;
    }

    public void addParam(String arg){
        parameters.add(arg);
    }


    public boolean isValid(){
        return this.exist() && (parameters.size() == args.length);
    }

    public void exec(){
        if(!isValid()){
            return;
        }
        System.out.println("EXEC" + command);
        for (String s: parameters){
            System.out.println(s);
        }
    }

}

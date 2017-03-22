package axl.stf.quixot.core.cerv;




import java.util.List;

public class TimeInterval {




    public boolean isFunction() {
        return true;
    }


    public Object call(Object thiz, Object... args) {
        if(args.length > 1){
            if(args[0] instanceof Integer && args[1] instanceof String){
                return getInterval((Integer) args[0], (String) args[1]);
            }
        }
        return Integer.valueOf(0);
    }


    public static final long getInterval(Integer period, String type){
        type = type.toLowerCase();

        if("nano".equals(type)){
            return period;
        }

//        switch (type){
//            case "nano":
//                return period;
//            case "seconds":
//            case "second":
//                return period * 1000;
//            case "minutes":
//            case "minute":
//                return period * getInterval(60, "seconds");
//            case "hour":
//            case "hours":
//                return period * getInterval(60, "minute");
//            case "day":
//            case "days":
//                return period * getInterval(24, "hour");
//            case "month":
//            case "months":
//                return period * getInterval(30, "day");
//            case "year":
//            case "years":
//                return period * getInterval(365, "day");
//        }

        return 0;

    }

}

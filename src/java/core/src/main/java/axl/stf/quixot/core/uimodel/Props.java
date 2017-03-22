package axl.stf.quixot.core.uimodel;

/**
 * Created by Alexandru.Stefan on 3/14/2017.
 */
public class Props {
    public static final String BACKGROUND = "background";
    public static final String ON_CLICK_EVENT = "onclick";

    public static boolean is(String property, String match){
        if (property == null){
            return false;
        }

        if (match.equalsIgnoreCase(property)){
            return true;
        }

        return false;
    }

    public static boolean background(String property){
        return is(property, BACKGROUND);
    }

    public static boolean clickEvent(String property){
        return is(property, ON_CLICK_EVENT);
    }
}

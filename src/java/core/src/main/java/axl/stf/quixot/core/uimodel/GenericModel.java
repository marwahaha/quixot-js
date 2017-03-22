package axl.stf.quixot.core.uimodel;

/**
 * Created by Alexandru.Stefan on 3/14/2017.
 */
public interface GenericModel {

    GenericModel set(String property, String value);

    /**
     * some engines evalue method signature based on name and number of arguments, not argument type
     * therefore the model is not supporting a set(string, double)
     * any additions to setters are free to implement, but not as part of the model
     * @param property
     * @param a
     * @param b
     * @param c
     * @param d
     * @return
     */
    GenericModel set(String property, double a, double b, double c, double d);

    /**
     * @param property - as property name
     * @return
     */
    Object get(String property);
    GenericModel addEventListener(String property, String methodName);
    void removeEventListener(String listener);
    boolean isVisible();
    boolean isEnabled();
    void setVisible(boolean visible);
    void setEnabled(boolean enabled);
}

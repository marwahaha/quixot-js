
package axl.stf.quixot.core.uimodel;


public interface WindowModel extends MinimalWindowModel {
    String addView(ViewModel component);
    String addView(ViewModel component, String name);
    WindowModel showView(String index);
    ViewModel getViewByName(String name);
}

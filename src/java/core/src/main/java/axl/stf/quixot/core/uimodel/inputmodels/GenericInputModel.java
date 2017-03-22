
package axl.stf.quixot.core.uimodel.inputmodels;

import axl.stf.quixot.core.uimodel.GenericModel;
import axl.stf.quixot.core.uimodel.ViewModel;

public interface GenericInputModel  extends ViewModel {
     void setValid(boolean valid);
     boolean isValid();
}

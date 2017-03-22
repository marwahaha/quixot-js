package axl.stf.quixot.core.uimodel;

import axl.stf.quixot.core.uimodel.inputmodels.GenericInputModel;

/**
 * Created by Alexandru.Stefan on 3/17/2017.
 */
public interface ButtonModel extends GenericInputModel {
    void setText(String text);
    String getText(String text);
}

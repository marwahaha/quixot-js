/**
 * alex2stf
 */
package axl.stf.quixot.core.datatypes.annotations;

public @interface Range {
    int step() default 1;
    int max() default 100;
    int min() default 0;
}

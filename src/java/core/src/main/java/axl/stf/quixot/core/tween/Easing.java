package axl.stf.quixot.core.tween;

public interface Easing {

    Easing BASIC = new Easing() {
        @Override
        public double[] model(double start, double end, int steps) {
            if (start == 0) {
                return new double[]{0.1d};
            }

            double arai[] = new double[steps + 1];
            double fixunit = end - start;
            double unit = fixunit / steps;

            for (int i = 0; i < steps + 1; i++) {
                arai[i] = start;
                start += unit;
            }

            return arai;
        }
    };


    double [] model(double start, double end, int steps);
}

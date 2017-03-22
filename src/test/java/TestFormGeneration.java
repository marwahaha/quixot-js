public class TestFormGeneration {





    public static void main(String[] args) {

        TestFormClass testFormClass = new TestFormClass();
        testFormClass.setNumber(250);

        AnnotationParser annotationParser = new AnnotationParser();
        annotationParser.scan(testFormClass);

    }
}

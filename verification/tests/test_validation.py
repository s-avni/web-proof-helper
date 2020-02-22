import unittest
from verification.validation import *

class Test_Validation(unittest.TestCase):

    def test_clean_up_test(self):
        self.assertEqual(['1+1', '2'], clean_up_txt('1+1\n2'))
        self.assertEqual(['4', '2\\cdot 2'], clean_up_txt('4\n2\\cdot 2'))
        self.assertEqual(['2', '\\frac{4}{2}'], clean_up_txt('2\n\\frac{4}{2}'))
        self.assertEqual(['(2\\cdot 1)(3+2)', '2\\cdot 5'], clean_up_txt('(2\\cdot 1?(3+2?\n2\\cdot 5'))
        self.assertEqual(['(1+1)', '2'], clean_up_txt('(1+1?\n2'))
        self.assertEqual(['2\\cdot (2\\cdot (1+1))', '8'], clean_up_txt('2\\cdot (2\\cdot (1+1??\n8'))

    def test_are_equivalent(self):
        # https://github.com/sympy/sympy/wiki/Faq#why-does-sympy-say-that-two-equal-expressions-are-unequal
        self.assertTrue(are_equivalent("x*x", "x^2"))
        self.assertTrue(are_equivalent("x*(1+y)", "x+xy"))
        self.assertTrue(are_equivalent("x*(1+y)", "x+x*y"))
        self.assertTrue(are_equivalent("x(1+y)", "x+xy"))
        self.assertTrue(are_equivalent("xy", "yx"))
        self.assertTrue(are_equivalent("x*y", "yx"))
        self.assertTrue(are_equivalent("x-x", "0"))


if __name__ == '__main__':
    unittest.main()
import os
import sys
import unittest

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from backend.validation import *



class Test_Validation(unittest.TestCase):

    def test_are_equivalent(self):
        # https://github.com/sympy/sympy/wiki/Faq#why-does-sympy-say-that-two-equal-expressions-are-unequal
        self.assertTrue(are_equivalent("4", "2\\cdot 2"))
        self.assertTrue(are_equivalent("2\\cdot 5", "(2\\cdot 1)(3+2)"))
        self.assertTrue(are_equivalent("2\\cdot 5", "(2\\cdot 1?(3+2?"))
        self.assertTrue(are_equivalent("8", "2\\cdot (2\\cdot (1+1))"))
        self.assertTrue(are_equivalent("8", "2\\cdot (2\\cdot (1+1??"))
        self.assertTrue(are_equivalent("2", "\\frac{4}{2}"))
        self.assertTrue(are_equivalent("1+1", "2"))
        self.assertTrue(are_equivalent("x*x", "x^2"))
        self.assertTrue(are_equivalent("x*(1+y)", "x+xy"))
        self.assertTrue(are_equivalent("x*(1+y)", "x+x*y"))
        self.assertTrue(are_equivalent("x(1+y)", "x+xy"))
        self.assertTrue(are_equivalent("x*x", "x^2"))
        self.assertTrue(are_equivalent("\\frac{1}{2}", "0.5"))
        # self.assertTrue(are_equivalent("\\ln (e)", "1")) #todo: fix on frontend - e converted to E or exponentialE
        self.assertTrue(are_equivalent("\\ln (E)", "1"))
        self.assertTrue(are_equivalent("\\ln (\\exponentialE ^{\\placeholder{}})", "1"))
        self.assertTrue(are_equivalent("\\ln (\\exponentialE^1)", "1"))
        self.assertTrue(are_equivalent("\\ln \\mleft(\\exponentialE \\mright?", "1"))
        self.assertTrue(are_equivalent("\\ln \\mleft(\\exponentialE ^2\\mright?", "2"))
        self.assertTrue(are_equivalent("\\ln \\mleft(\\exponentialE ^{}\\mright?", "1"))
        self.assertTrue(are_equivalent("xy", "yx"))
        self.assertTrue(are_equivalent("x*y", "yx"))
        self.assertTrue(are_equivalent("x-x", "0"))
        self.assertTrue(are_equivalent("\\sin ^{-1}(1)", '\\frac{\\pi }{2}')) #sin^-1(1), pi/2
        self.assertTrue(are_equivalent("10^{\\placeholder{}}", "10"))
        self.assertTrue(are_equivalent("\\log _{10}100", "2"))
        self.assertTrue(are_equivalent("\\log _39", "2")) #log_3(9)=2
        self.assertTrue(are_equivalent("\log _{10}100\cdot \log _{10}100", "4")) #todo
        self.assertTrue(are_equivalent("\\log _39\\cdot \\log _33", "3")) #todo


    def test_is_ascii(self):
        self.assertTrue(is_ascii("abc"))
        self.assertFalse(is_ascii("דקאלך"))

    def test_complete_parse(self):
        self.assertEqual(str(complete_parse(simplify_latex("\\sin \\mleft(2x\\mright)"))), "sin(2*x)")

    def test_simplify_latex(self):
        self.assertEqual(simplify_latex("\\sin \\mleft(2x\\mright)"), "\sin (2x)")


if __name__ == '__main__':
    unittest.main()
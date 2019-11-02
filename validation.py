from sympy import solve
from sympy.parsing.sympy_parser import convert_equals_signs, convert_xor, function_exponentiation, implicit_application, \
    implicit_multiplication, implicit_multiplication_application, parse_expr, standard_transformations


def clean_up_txt(txt):  # remove empty lines, etc
    str_list = txt.splitlines()
    str_list = [s.strip() for s in str_list]
    str_list = list(filter(None, str_list))
    print(str_list)
    return str_list


def are_Equivalent(row1, row2):
    # todo: separate into cases (e.g. polynomials, trig, etc.) before checking equivalence. This is because simplify can be overkill for basic expressions - it takes more time and can occasionally miss things. Instead, use "trigsimp", "factor", or... see: https://docs.sympy.org/latest/tutorial/simplification.html, https://docs.sympy.org/latest/modules/simplify/simplify.html
    transformations = standard_transformations + (
    convert_equals_signs, implicit_multiplication_application, implicit_application, implicit_multiplication, convert_xor, function_exponentiation)
    expr1 = parse_expr(row1, transformations=transformations)
    expr2 = parse_expr(row2, transformations=transformations)
    print(expr1, expr2)
    # print(type(expr1))
    print(solve(expr1))  # todo: return True if non zero subset too :)
    print(solve(expr2))
    return solve(expr1) == solve(expr2)


def validate_new_line(txt):
    str_list = clean_up_txt(txt)
    if len(str_list) == 0:
        return True
    for i in range(len(str_list) - 1):
        msg = are_Equivalent(str_list[i], str_list[i + 1])
        if msg is not True:
            return "You have a mistake in row " + str(i + 2) + ". " + str(msg)  # because start count at 1
    return True

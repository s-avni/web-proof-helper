import re
from sympy import expand, simplify, solve
from sympy.parsing.latex import parse_latex
from sympy.parsing.sympy_parser import convert_equals_signs, convert_xor, function_exponentiation, implicit_application, \
    implicit_multiplication, implicit_multiplication_application, parse_expr, standard_transformations

TRANSFORMATIONS = standard_transformations + (
    convert_equals_signs, implicit_multiplication_application, implicit_application, implicit_multiplication,
    convert_xor, function_exponentiation)


def clean_math_jive_input(s):
    s = replace_question_mark_by_parentheses(s)
    return s


def replace_question_mark_by_parentheses(s):
    return s.replace("?", ")")


# todo: this only replaces 1 occurence. so it fails if we do: log _39 * log _39
def fix_logarithm(s):  # want \\log _39 to become \\log _{3}9
    last_s = s
    regex_for_fix = r'(.*log _)([1-9])(\d+.*)'
    curr_s = re.sub(regex_for_fix, '\\1{\\2}\\3', s)
    while curr_s != last_s:
        last_s = curr_s
        curr_s = re.sub(regex_for_fix, '\\1{\\2}\\3', curr_s)
    if ("log" in curr_s):
        print("original log:", s, " - fixed log:", curr_s)
    return curr_s


def simplify_latex(s):
    s = simplify_parentheses(s)
    s = fix_exponent(s)
    s = fix_logarithm(s)
    return s


def simplify_parentheses(s):
    s = s.replace("\mright", "")
    s = s.replace("\mleft", "")
    return s


def fix_exponent(s):
    s = s.replace("\exponentialE", "E")
    s = s.replace("^{}", "")
    s = s.replace("^{\placeholder{}}", "")
    return s


def preprocess_input_lines(txt):
    print([txt])
    str_list = txt.splitlines()
    str_list = [s.strip() for s in str_list]
    str_list = list(filter(None, str_list))
    return str_list


def complete_parse(txt):
    return parse_expr(str(parse_latex(txt)), transformations=TRANSFORMATIONS)


def are_equivalent(row1, row2):
    row1 = simplify_latex(clean_math_jive_input(row1))
    row2 = simplify_latex(clean_math_jive_input(row2))
    print(row1, row2)
    try:
        # todo: separate into cases (e.g. polynomials, trig, etc.) before checking equivalence. This is because simplify can be overkill for basic expressions - it takes more time and can occasionally miss things. Instead, use "trigsimp", "factor", or... see: https://docs.sympy.org/latest/tutorial/simplification.html, https://docs.sympy.org/latest/modules/simplify/simplify.html
        expr1 = complete_parse(row1)
        print(expr1)
        expr2 = complete_parse(row2)
        print(expr2)
        if expr1.is_Relational and expr2.is_Relational:  # e.g. 2x-4=0, x-2=0; x>2, x<=4
            print(solve(expr1))
            print(solve(expr2))
            return solve(expr1) == solve(expr2)
        if not expr1.is_Relational and not expr2.is_Relational:  # e.g. 2x-4, x-2
            # https://docs.sympy.org/latest/tutorial/basic_operations.html
            are_equivalent_val_to_compare = simplify(
                expand(expr1) - expand(expr2))
            are_equivalent_res = are_equivalent_val_to_compare == 0
            print("are_equivalent_res", are_equivalent_res)
            return are_equivalent_res
        else:  # todo: convert to raise exception?
            return "Error: You can't have an = sign in one line and not in the other!"
    except Exception as err:  # todo: raise exception and catch in one place?
        print(err)
        return "Error: problem understanding the expression"


# =======
# def are_equivalent(row1, row2, over_reals=True):
#     # transformations = standard_transformations + (
#     # convert_equals_signs, implicit_multiplication_application, implicit_application, implicit_multiplication, convert_xor, function_exponentiation)
#     # expr1 = parse_expr(row1, transformations=transformations)
#     # expr2 = parse_expr(row2, transformations=transformations)
#     if over_reals is True:
#         domain = S.reals
#     expr1 = parse_latex(row1)
#     expr2 = parse_latex(row2)
#     print(expr1)
#     print(expr2)
#     if expr1.is_Relational and expr2.is_Relational: #e.g. 2x-4=0, x-2=0; x>2, x<=4
#         print(solveset(expr1, domain=domain))
#         print(solveset(expr2, domain=domain))
#         return solveset(expr1, domain=domain) == solve(expr2, domain=domain)
#     if not expr1.is_Relational and not expr2.is_Relational: #e.g. 2x-4, x-2
#         print(solve(expr1-expr2))
#         # print(type(solve(expr1-expr2)))
#         print(expr1-expr2)
#         print(type(expr1-expr2))
#         print(expand(expr1-expr2))
#         # todo: symplify does not work well - it's meant to be used interactively... see documentation
#         return sympify(expand(expr1-expr2)) == Zero
#     else:
#         return "Error: You can't have an = sign in one line and not in the other!"
# >>>>>>> Stashed changes

def is_ascii(txt):
    return len(txt) == len(txt.encode())


def validate_new_line(txt):
    str_list = preprocess_input_lines(txt)
    if len(str_list) < 2:
        return True
    if not all(map(is_ascii, str_list)):
        return "Please only enter ascii-encoded strings."
    for i in range(len(str_list) - 1):
        msg = are_equivalent(str_list[i], str_list[i + 1])
        if msg is not True:
            # because start count at 1
            return "You have a mistake in row " + str(i + 2) + ". " + str(msg)
    return True

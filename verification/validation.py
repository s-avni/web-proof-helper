from sympy import expand, solve, sympify, simplify
from sympy.parsing.latex import parse_latex

from sympy.parsing.sympy_parser import parse_expr,implicit_multiplication_application,standard_transformations
s = parse_expr("x(y+1)", transformations=(standard_transformations +
                            (implicit_multiplication_application,)))
print(s)


# todo: frontend - make sure only ascii (not hebrew, etc)

# def add_missing_closing_parentheses(s):
#     num_to_add = s.count("(") - s.count(")")
#     parentheses_to_add = ')'*num_to_add
#     return s+parentheses_to_add

def replace_question_mark_by_parentheses(s):
    return s.replace("?", ")")


def clean_up_txt(txt):  # remove empty lines, etc
    print([txt])
    str_list = txt.splitlines()
    str_list = [s.strip() for s in str_list]
    str_list = list(filter(None, str_list))
    str_list = [replace_question_mark_by_parentheses(s) for s in str_list]
    print(str_list)
    return str_list


def are_equivalent(row1, row2):
    try:
        # todo: separate into cases (e.g. polynomials, trig, etc.) before checking equivalence. This is because simplify can be overkill for basic expressions - it takes more time and can occasionally miss things. Instead, use "trigsimp", "factor", or... see: https://docs.sympy.org/latest/tutorial/simplification.html, https://docs.sympy.org/latest/modules/simplify/simplify.html
        expr1 = parse_latex(row1)
        print("\n\n")
        print(expr1)
        expr2 = parse_latex(row2)
        print(expr2)
        if expr1.is_Relational and expr2.is_Relational:  # e.g. 2x-4=0, x-2=0; x>2, x<=4
            print(solve(expr1))
            print(solve(expr2))
            return solve(expr1) == solve(expr2)
        if not expr1.is_Relational and not expr2.is_Relational:  # e.g. 2x-4, x-2
            # https://docs.sympy.org/latest/tutorial/basic_operations.html
            are_equivalent_val_to_compare = simplify(expand(expr1) - expand(expr2))
            are_equivalent_res = are_equivalent_val_to_compare == 0
            print("are_equivalent_res", are_equivalent_res)
            return are_equivalent_res
        else:
            return "Error: You can't have an = sign in one line and not in the other!"
    except Exception as err:
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


def validate_new_line(txt):
    str_list = clean_up_txt(txt)
    if len(str_list) == 0:
        return True
    for i in range(len(str_list) - 1):
        msg = are_equivalent(str_list[i], str_list[i + 1])
        if msg is not True:
            # because start count at 1
            return "You have a mistake in row " + str(i + 2) + ". " + str(msg)
    return True

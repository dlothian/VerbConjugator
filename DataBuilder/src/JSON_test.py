import itertools, collections
import re, os
import sys
import json
import numpy
from termcolor import colored


paths_with_duplicates = []

class TESTS:

    @staticmethod
    def runtests():
        """
        Function calls test functions and passes named files. To test on different files of the same format,
        change the arguments in the function calls.
        """

        print("\n-------\nTESTING INFORMATION\n-------")
        TESTS.information_tests("JSON/information.json")
        TESTS.conjugation_tests("JSON/conjugation.json")

    @staticmethod
    def information_tests(file_name):
        '''
        Tests the information file to relay descriptive information of the items inside.
        Checks for duplicate item ids, and duplicate item (translation,base) pairs.

        Args:
            file_name (str): Name of the information file to be tested. Must be in the same format as the outputed information
            file from the main.py file.

        Returns:
            None
        '''

        f = open(file_name)
        json_file = json.load(f)
        s = "CATEGORY information: "
        print("\n{}\n{}\n{}".format("-"*len(s), s,"-"*len(s)))
        
        error = {}
        confusion = {}
        for cat in json_file:
            
            print("* {} has ({}) unique options.".format(cat['name'].upper(), len(cat['children'])))
        print("\nSee JSON/information.json file for all unique option(s).\n")

        
        for cat in json_file:
            ids = [i['id'] for i in cat['children']]
            base_tra = [(i['translation'], i['base']) for i in cat['children']]
            if len(ids) > len(set(ids)):
                error[cat['name']] = [(item, count) for item, count in collections.Counter(ids).items() if count > 1]
            if len(base_tra) > len(set(base_tra)):
                confusion[cat['name']] = [(item, count) for item, count in collections.Counter(base_tra).items() if count > 1]
        
        if error:
            s = "Details of the objects with duplicate ids:\n"
            print(colored("! FATAL ERROR !", 'red'))
            print("There are ({}) cateogories whose items contain DUPLICATE ids.".format(len(error)))
            print("Duplicate ids within the same category will cause errors in other JSON and in the front end. Please resolve and rebuild.\n")
            for e in error:
                print("In the {} category, there are:".format(e.upper()))
                s+= "\nCateogry: {}\n".format(e.upper())
                for id in error[e]:
                    s += '\n- Duplicates with id: {}\n\t----------------\n'.format(id[0])
                    print("\t- {} instances of the id '{}'.".format(id[1], id[0]))
                    for cat in json_file:
                        if cat['name'] == e:
                            for child in cat['children']:
                                if child['id'] == id[0]:
                                    
                                    for sub in child:
                                        s += '\t{} : {}\n'.format(sub, child[sub])
                                    s += '\t----------------\n'
            if not os.path.exists('ERRORS/'):
                    os.makedirs('ERRORS/')
            k = open('ERRORS/FATAL_duplicatedIDs.txt', 'w')
            print("For more details, see the ERRORS/FATAL_duplicatedIDs.txt file.")
            k.write(s)
            k.close()


        if confusion:
            s = "Details of the objects with duplicate translation,base pairs:\n"
            print(colored("\n* WARNING *", 'yellow'))
            print("There are ({}) cateogories whose items contain DUPLICATE base + translations. This is a non-fatal error.".format(len(confusion)))
            print("Please ensure these duplicates are intentional, and that they will not cause confusion.\n")
            for c in confusion:
                print("In the {} category, there are:".format(c.upper()))
                s+= "\nCateogry: {}\n".format(c.upper())
                for t in confusion[c]:
                    s += "\n- Duplicates with translation,base pair: '{}', '{}'\n\t----------------\n".format(t[0][0], t[0][1])
                    print("\t- {} instances of the combination TRANSLATION: '{}'".format(t[1], t[0][0]))
                    print(' '*len("- 9 instances of the combination ")+ "\t BASE: '{}'\n".format(t[0][1]))
                    for cat in json_file:
                        if cat['name'] == c:
                            for child in cat['children']:
                                if child['translation'] == t[0][0] and child['base'] == t[0][1]:
                                    for sub in child:
                                        s += '\t{} : {}\n'.format(sub, child[sub])
                                    s += '\t----------------\n'
                print()

            if not os.path.exists('ERRORS/'):
                    os.makedirs('ERRORS/')
            k = open('ERRORS/duplicate_trans_base.txt', 'w')
            k.write(s)
            k.close()
            print("For more details, see the ERRORS/duplicate_trans_base.txt file.")

    @staticmethod
    def conjugation_tests(file_name):
        '''
        Tests the conjugation.json tree file to find errors around duplicate paths. 
        A duplicate path is one that is not unique, and results in more than one conjugation.
        Function detects duplicates, and reports on them, and potentially suggests the error.

        Args:
            file_name (str): Name of the conjugation file to be tested. Must be in the same format as the outputed conjugation
            file from the main.py file.

        Returns:
            None
        '''

        global paths_with_duplicates
        f = open(file_name)
        json_file = json.load(f)
        f.close()
        cats = json_file.pop(0)
        full_file_str = str(json_file)
        not_unique = full_file_str.find("',")
        s = "CONJUGATION information: "
        print("\n{}\n{}\n{}".format("-"*len(s), s,"-"*len(s)))
        if not_unique != -1:
            for key in json_file[0]:
                TESTS.recurse_tree(json_file[0][key], [key])
            g = open('JSON/information.json', 'r')
            json_informationfile = json.load(g)
            g.close()

            paths = {}
            types = {}
            og_types = {}
            worst_offenders = {}
            worst_combos = {}

            for i in json_informationfile:
                    if i['name'] != 'verb':
                        types[i['name']] = set()
                        og_types[i['name']] = set([j['id'] for j in i['children']])
                        worst_offenders[i['name']] = {}
            print(colored("\n* WARNING *", 'yellow'))
            print("There are ({}) instances of non-unique conjugation paths\n".format(len(paths_with_duplicates)))
            if paths_with_duplicates:
                verb_index = cats.index('verb')
                for p in paths_with_duplicates:
                    for i in cats:
                        if i != 'verb' and i != 'conjugation':
                            types[i].add(p[cats.index(i)])
                            if p[cats.index(i)] in worst_offenders[i]:
                                worst_offenders[i][p[cats.index(i)]] += 1
                            else:
                                worst_offenders[i][p[cats.index(i)]] = 1
                ignore = []
                for g in og_types:
                    if og_types[g] == types[g]:
                        worst_offenders.pop(g)
                        ignore.append(g)
                if ignore:
                    print("The following categories likely NOT the problem:")
                    for i in ignore:
                        print("- {}\n".format(i))
                    

                ignore += ['verb', 'conjugation']
                ignore = sorted([cats.index(i) for i in ignore], reverse=True)

                for p in paths_with_duplicates:
                    verb = p[verb_index]
                    conj = tuple(p[-1])
                    p = [m+"_"+str(n) for m,n in zip(cats, p)]
                    
                    for i in ignore:
                        p.pop(i)
                    
                    for m, n in itertools.product(p, p):
                        
                        if m != n:
                            l = tuple(sorted([m,n]))
                            if l not in worst_combos:
                                worst_combos[l] = 1
                            else:
                                worst_combos[l] += 1
                    p_ = tuple(p)
                    if p_ not in paths:
                        paths[p_] = {(verb, conj)}
                    else:
                        paths[p_].add((verb, conj))
                    p.append(conj)

                worst_combos = sorted(worst_combos.items(), key=lambda item: item[1], reverse=True)
                max_num = worst_combos[0][1]
                print("Most problematic combination(s):")
                count = 0
                for w in worst_combos:
                    if w[1] == max_num:
                        print("- {} and {} with a count of {} instances\n".format(w[0][0], w[0][1], w[1]//2))
                        count+=1
                    else:
                        if count * (max_num//2) == len(paths_with_duplicates):
                            print("These {} combinations, each with a count of {}, make up all {} of the duplicate paths.\n".format(count, max_num//2, len(paths_with_duplicates)))
                        break
                print("For full information on problematic paths, see the file ERRORS/duplicate_paths.txt\n")
                if not os.path.exists('ERRORS/'):
                    os.makedirs('ERRORS/')
                k = open('ERRORS/duplicate_paths.txt', 'w')
                k.write("The following paths produce multiple conjugations: \n")
                cats.pop(-1)
                cats.pop(verb_index)
                c = "  |  ".join(cats) + ' | verb ex. |' + ' conj ex. |'
                dashes = "-"*len(c)
                s = "{} {} {} {} {}\n".format(dashes, "\n|",c, '\n', dashes)
                k.write(s)
                paths_no_verb = [key for key in paths]
                paths_no_verb.sort()
                for i in paths_no_verb:
                    ex_verbs = list(paths[i])
                    ex_verbs = ex_verbs[:min(3, len(ex_verbs))]
                    ex_verbs_only = [e[0] for e in ex_verbs]
                    conj_ex = ex_verbs[0][1]
                    k.write("{} {} {} {} {} {} {} \n".format("|"," | ".join(i), "|", ','.join(ex_verbs_only), "|", ' & '.join(conj_ex), "|"))
                k.write("{}\n".format(dashes))
                k.close()

        else:
            print(colored("\n* PASSED *", 'green'))
            print("There are ({}) instances of non-unique conjugation paths\n".format(len(paths_with_duplicates)))




    @staticmethod
    def recurse_tree(sub, path=[], root=True):
        '''
        Recurses through a tree structure to find if there is more than one leaf value per path.

        Args:
            sub (dictionary): sub tree of the main tree
            path (list, optional): Path that function is on during recurse. Defaults to [].
            root (bool, optional): Whether currently at root. Defaults to True.

        Returns:
            Returns values only during the recurse, otherwise returns none
        '''

        global paths_with_duplicates

        if isinstance(sub, list):
            if len(sub) > 1:
                path.append(sub)
                return path
            else:
                return False
        else:
            for key in sub:
                new_path = list(path)
                new_path.append(key)
                duplicate = TESTS.recurse_tree(sub[key], new_path, False)
                if duplicate:
                    paths_with_duplicates.append(duplicate)
            
# TESTS.runtests()
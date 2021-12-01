import csv
import os, json
import codecs
import sys
import fileinput
import textdistance

class CSVtoDict:

    def __init__(self, input_file, delimiter=None, order=None):
        """Initalizes relevant variables.

        Args:
            input_file (str): Input CSV file to be read and turned into a list 
            of python dictionaries.
        """
        self.order = order
        self.input_file = input_file  
        self.list_of_dicts = []
        self.attr_list_of_dicts = []
        self.headers = []
        if delimiter:
            self.delimiter = delimiter
        else:
            self.delimiter = "_"


    def execute(self):
        self.cleanData()
        self.columnTitles()
        self.toDict()
        if os.path.exists(self.input_file):
            os.remove(self.input_file)
        self.list_of_dicts = self.removeDupe(self.list_of_dicts)
        p, a = self.assignRemoveAttributesTitles()
        if not self.order:
            self.order = p
        self.assignRemoveAttributes()
        return self.list_of_dicts, self.attr_list_of_dicts


    def cleanData(self):
        f = open(self.input_file, 'r')
        text = f.read()
        
        lines = [line.lower() for line in text]
        self.input_file = self.input_file[:self.input_file.find(".csv")] + "_temp.csv"
        with open(self.input_file, 'w') as out:
            out.writelines(lines)


    def columnTitles(self):
        """
        Grabs the column/category titles.
        """
        
        with codecs.open(self.input_file, encoding='UTF-8') as f:
            reader = csv.reader(f)
            self.headers = next(reader)


    def toDict(self):
        """Reads in CSV file and 

        Returns:
            None
        """
        with codecs.open(self.input_file, encoding='UTF-8') as csvfile:
            scrape_dict = csv.DictReader(csvfile)
            self.list_of_dicts = [x for x in scrape_dict]

        
    def removeDupe(self, removeFrom):
        """
        Removes duplicate dictionary entries from the list.
        """
        s = {tuple(d.items()) for d in removeFrom}
        return [dict(t) for t in s]
    


    def assignRemoveAttributesTitles(self):
        """
        If there are columns in the csv files that are attributes of a larger class, this function will
        appropriately group them in the appropriate dictionary.
        A column is considered an attribute of another column if it's title is of the following structure:
        columnname_attributename
        E.g.verb_translation given that there is a separate column entitled 'verb'.
        """
        primary = set()
        attribute = {}
        headers = set()
        for col_name in self.headers:
                if self.delimiter not in col_name:
                    headers.add(col_name)

        if self.order:
            primary = set(self.order)
            for o in primary:
                if o not in headers:
                    print("------------------")
                    print("[FATAL ERROR]\n{} - Invalid column name. Check order.csv file.".format(o))
                    mispelt = list()
                    for h in headers:
                        if textdistance.levenshtein(o, h) <=2:
                            mispelt.append(h)
                    if mispelt:
                        print("Did you mean: {}?\n".format(", ".join(mispelt)))
                    print("------------------")
                    sys.exit()

            
        else:
            primary = headers

        for col_name in self.headers:
            if self.delimiter in col_name:
                prim_attr = col_name.split(self.delimiter)
                if prim_attr[0] in primary:
                    attribute[col_name] = {"primary":prim_attr[0], "attribute":prim_attr[1]}

        return primary, attribute


    def assignRemoveAttributes(self):
        """
        Attributes of the primary categories are redundant in the final tree. They should be removed before the tree is made.
        """
        primary, attribute = self.assignRemoveAttributesTitles()
        temp_dicts_list = []
        for col in self.list_of_dicts:
            no_attr = {}
            attr = {}
            for x in col:
                if x in primary: 
                    no_attr[x] = col[x]
                    if x not in attr:
                        attr[x] = {}
                        attr[x]["id"] = col[x]
                    elif "id" not in attr[x]:
                        attr[x]["id"] = col[x]

                if x in attribute:
                    if attribute[x]["primary"] not in attr:
                        attr[attribute[x]["primary"]] = {}
                    attr[attribute[x]["primary"]][attribute[x]["attribute"]] = col[x]
                    

            temp_dicts_list.append(no_attr)
            self.attr_list_of_dicts.append(attr)
        self.list_of_dicts = temp_dicts_list


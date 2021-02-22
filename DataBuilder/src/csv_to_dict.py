import csv
import os, json
import codecs
import sys

class CSVtoDict:

    def __init__(self, input_file, delimiter=None, order=None, app_order=None):
        """Initalizes relevant variables.

        Args:
            input_file (str): Input CSV file to be read and turned into a list 
            of python dictionaries.
        """
        self.order = order
        self.app_order = app_order
        self.input_file = input_file  
        self.list_of_dicts = []
        self.attr_list_of_dicts = []
        self.headers = []
        if delimiter:
            self.delimiter = delimiter
        else:
            self.delimiter = "_"

    def execute(self):
        self.columnTitles()
        self.toDict()
        
        p, a = self.assignRemoveAttributesTitles()
        print('P',p)
        if not self.order:
            self.order = p
        self.conjugationFile(p)
        self.assignRemoveAttributes()

        # self.removeDupe(self.attr_list_of_dicts)
        self.removeDupe(self.list_of_dicts)

        self.writeOutputs(self.attr_list_of_dicts, self.input_file +"_w_attr_dicts.txt")
        self.writeOutputs(self.list_of_dicts, self.input_file +"_dicts.txt")

        return self.list_of_dicts, self.attr_list_of_dicts

    def columnTitles(self):
        """
        Grabs the column/category titles.
        """
        
        with codecs.open(self.input_file, encoding='latin1') as f:
            reader = csv.reader(f)
            self.headers = next(reader)
            self.headers = [x.lower() for x in self.headers]

    def conjugationFile(self, p):
        if not os.path.exists('csv2tree_data/app_json_files'):
            os.makedirs('csv2tree_data/app_json_files')
        output_file = "csv2tree_data/app_json_files/conjugation.json"
        conj_list = []
        for i in self.list_of_dicts:
            c = {}
            c['conjugation'] = i['conjugation']
            for j in i:
                if j in p:
                    c[j] = i[j]
            conj_list.append(c)


        with open(output_file, 'w') as json_file:
            json.dump(conj_list, json_file,indent=4)

    def toDict(self):
        """Reads in CSV file and 

        Returns:
            Output File (str): Name of file where dictionary list is written.
            List of Dictionaries (list): List of converted dictionaries (with no duplicates)
        """
        with codecs.open(self.input_file, encoding='latin1') as csvfile:
            scrape_dict = csv.DictReader(csvfile)
            self.list_of_dicts = [x.lower() for x in scrape_dict]
        
    def removeDupe(self, removeFrom):
        """
        Removes duplicate dictionary entries from the list.
        """
        
        return [dict(t) for t in {tuple(d.items()) for d in removeFrom}]
        

        for r in rmv:
            self.list_of_dicts.remove(r)
        for a in addto:
            self.list_of_dicts.append(a)
        
        del rmv, addto


    def writeOutputs(self, outputs, file_name):
        if not os.path.exists('csv2tree_data'):
            os.makedirs('csv2tree_data')
        file_name = 'csv2tree_data/' + file_name
        with open(file_name, 'w') as file:
            for n in outputs:
                s = str(n) + "\n"
                file.write(s)
            file.close()


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
        if self.order:
            primary = set(self.order)
        if self.app_order:
            for a in self.app_order:
                print("adding to primary", a)
                primary.add(a)
        else:
            for col_name in self.headers:
                if self.delimiter not in col_name:
                    primary.add(col_name)

        for col_name in self.headers:
            if self.delimiter in col_name:
                prim_attr = col_name.split(self.delimiter)
                if prim_attr[0] not in primary:
                    print(col_name, "is not a valid column name")

                else:
                    attribute[col_name] = {"primary":prim_attr[0], "attribute":prim_attr[1]}

        return primary, attribute

    def assignRemoveAttributes(self):
        """
        Attributes of the primary categories are redundant in the final tree. They should be removed before the tree is made.
        """
        primary, attribute = self.assignRemoveAttributesTitles()
        print("attribute", attribute)
        temp_dicts_list = []
        conj_file_list = []
        for col in self.list_of_dicts:
            no_attr = {}
            attr = {}
            conj = {}
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


import json
import os
import sys

class OptionBuilder:

    def __init__(self, attr_dict_list, app_order):
        """
        Class creates individual JSON files containing all elements of the individual options, 
        with no duplicates

        Args:
            dict_list (list): List of dictionaries 
        """

        self.attr_dict_list = attr_dict_list
        self.attrs = {}
        self.app_order = app_order
        self.removeDupes()
        self.writeAttr()


    def removeDupes(self):
        """
        Removes duplicates by adding each element to its respective dictionary attr set
        """
        
        for key in self.attr_dict_list[0].keys():
            self.attrs[key] = set()

        for d in self.attr_dict_list:
            for attr in d:
                self.attrs[attr].add(tuple(d[attr].items()))

        for key in self.attrs:
            temp = [dict(t) for t in self.attrs[key]]
            self.attrs[key] = temp
        

    def writeAttr(self):
        """
        Creates each file using the attr dictionary where each key has a set of unique values.
        Files are saved to the 'data' folder.
        """
        if not os.path.exists('JSON/'):
            os.makedirs('JSON/')
        major_output_file = "JSON/information.json"
        major = {}
        for attr in self.attrs:
            if self.app_order:
                if attr not in self.app_order:
                    continue
            tojson = {"name":attr, "children":[]}
            for value in self.attrs[attr]:
                tojson["children"].append(value)
            newlist = sorted(tojson["children"], key=lambda k: k['id']) 
            tojson["children"] = newlist
            major[attr] = tojson

        if self.app_order:
            temp = []
            for d in self.app_order:
                temp.append(major[d])
            major = temp
        else:
            major = list(major.values())

        with open(major_output_file, 'w') as json_file:
            json.dump(major, json_file,indent=4)
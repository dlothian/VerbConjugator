import os
import json


def makeToolTips(tips):
    if not os.path.exists('JSON/'):
            os.makedirs('JSON/')
    output_file = "JSON/tooltip.json"

    tooltips = []
    for t in tips:
        tip_dict = {"type":t}
        html = "<p>Insert " 
        html += t[0].upper()
        html += t[1:].lower()
        html += " Description</p>"
        tip_dict["tip"] = html
        tooltips.append(tip_dict)

    with open(output_file, 'w') as json_file:
            json.dump(tooltips, json_file,indent=4)

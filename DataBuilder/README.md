# DataBuilder

## Usage

Move the target csv file to the current directory. Next, run the following command:

    `python main.py <input_file> <order_file>`[OPTIONAL]
    
* `<input_file>` is s CSV file that contains the structured input data. See below for required structure. 
* `<order_file>` is a CSV file containing user-specified app order. If file is not specified, the default order will match the input file. See below for required structure. 

### Good To Go!
If running this was a success, your app is good to go. Please navigate to the director `VerbConjugator/VerbApp` for further instructions.

## Input

#### The Input File

The Input file should be a [comma separated file (CSV)](https://www.howtogeek.com/348960/what-is-a-csv-file-and-how-do-i-open-it/) where the first line is the row headers. For example,

        `verb,subject,tense
        1SG,past
        1SG,past`

This file likely **should not** include information redundant to the conjugation. If you're exporting your CSV from excel or google sheets, feel free to simply *delete the redundant columns*. This program will remove any duplicate lines, so that is not an issue.

#### The Order File 

The Order file should be a [comma separated file (CSV)](https://www.howtogeek.com/348960/what-is-a-csv-file-and-how-do-i-open-it/) with a single line similar to the row headers as the input file. For example `order_file` might be of the following form:

    `verb, tense, subject, object`


The default of the order in which each attribute is with respect to the level of the tree is the order given in the input file. You should only include this file if you want a different order. 

To learn more about why tree order is important, please visit [LINK TBD]

## Output

Running this program will output a number of files, described below.

#### The Tree Files

This The tree file contains your language's conjugation data in a [tree data structure](https://en.wikipedia.org/wiki/Tree_(data_structure)) in a JSON file. 
This file will be found either under the name `conjugation_tree.json` OR whatever the user-specificed `<output_file>` is.
For example, your JSON tree might look as follows

```json
{
    "past": {
        "1SG": [
                    "2SG", 
                    "3SG"
                ],
    }
}
   
```

To learn about the structure of your new tree file, please visit [LINK TBD]


#### The Data Folder

Once run, a `JSON` folder will be created if it does not currently exist. In this folder, a JSON file will be created for each attribute included. Each file's name will be of the format: `attribute.JSON`.

For example, if `subject` is included, a file named `subject.JSON` will be created and have the following format:

```json

[
    {
        "tag": "1SG"
    }
]
```




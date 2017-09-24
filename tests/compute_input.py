## compute_input.py

import sys, json, numpy as np, pandas as pd

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()

    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    #get our data as array of dictionaries from read_in()
    lines = read_in()

    #initialize empty panda DF
    df = pd.DataFrame()

    #iterate through array to get dictionaries
    for line in lines['transactions']:
        #convert dictionary to panda data frame
        dfline = pd.DataFrame(line, index=[0])
        df = df.append(dfline)

    #get selected attributes (transactionAmount, transactionDate, transactionDescription)
    dffilter = df[['transactionAmount', 'transactionDate', 'transactionDescription']]

    #return dataframe with selected attributes
    print (dffilter)

#start process
if __name__ == '__main__':
    main()
import pandas as pd
def send_json(file_name):
    def Transaction(df):
        D={}
        for i in range(len(df["transactions"][0])):
            d={}
            f=df["transactions"][0][i]
            d["Type"]=f["Type"]
            d["Mode"]=f["Mode"]
            d["Amount"]=f['Amount']
            d["CurrentBalance"]=f["CurrentBalance"]
            d["valueDate"]=f["valueDate"]  
            D[f['Txnid']]=d

        return D

    def SUMMA(df):
        d={}
        d["Type"]=df['summary.Type'][0]
        d["OpenDate"]=df["summary.openingDate"][0]
        d["Currency"]=df['summary.Currency'][0]
        d["BalanceDate"]=df['summary.balanceDateTime'][0][:len("2020-06-22")]
        d["CurrentBalance"]=df['summary.CurrentBalance'][0]
        d["Branch"]=df["summary.branch"][0]
        d["Staus"]=df['summary.Status'][0]
        return d
    
    def SUMMARY(df):
        summary={}
        summary["Type"]=df["profile.Account.fitype"][0]
        summary["Freq"]=df['summary.compoundingFrequency'][0]
        summary["tenure_days"]=df['summary.tenureDays'][0]
        summary["tenure_months"]=df['summary.tenureMonths'][0]
        summary["Interest"]=df["summary.interestRate"][0]
        summary["OpenDate"]=df['summary.openingDate'][0]
        summary["Principle"]=df['summary.principalAmount'][0]
        try:
            summary["RA"]=df['summary.recurringAmount'][0]
        except:
            print("")
        summary["EndDate"]=df["summary.maturityDate"][0]
        summary["InterestAmount"]=df["summary.interestOnMaturity"][0]
        summary["Current"]=df['summary.currentValue'][0]
        summary["MaturityAmount"]=df["summary.maturityAmount"][0]
        return summary

    def Profile(df):
        dick=df["profile.Holders.Holder"][0][0]
        dick["Account Number"]=df["profile.Account.number"][0]
        dick["Account Type"]=df["profile.Account.acctype"][0]
        dick["fitype"]=df["profile.Holders.type"][0]
        dick["IFSC"]=df["summary.ifsc"][0]
        try:
            dick["CurrentAmount"]=df['summary.currentValue'][0]
        except:
            dick["CurrentAmount"]=df['summary.CurrentBalance'][0]
        return dick
    
    def Trans(df):
        D={}
        for i in range(len(df['transactions'][0])):
            d={}
            f=df['transactions'][0][i]
            #d['Txnid']=f['Txnid']
            d['Amount']=f['Amount']
            d['Balance']=f['Balance']
            d['valueDate']=f['valueDate'][:len("2020-01-22")]
            try:
                d['TransactionsEndDate']=f['TransactionsEndDate']
            except:
                d["endDate"]=f['endDate']
            D[f['Txnid']]=d
        return D
    
    df1=pd.read_json(file_name)
    names=["transactions","fixed","recurring"]
    d={}
    A=pd.json_normalize(df1["accounts"][0])  ### Transact
    B=pd.json_normalize(df1["accounts"][1]) ####FD
    C=pd.json_normalize(df1["accounts"][2])
    D={}
    D["profile"]=Profile(A)
    D["summary"]=SUMMA(A)
    D["Details"]=Transaction(A)
    d["transactions"]=D
    D={}

    D["profile"]=Profile(B)
    D["summary"]=SUMMARY(B)
    D["Details"]=Trans(B)
    d["fixed"]=D
    D={}

    D["profile"]=Profile(C)
    D["summary"]=SUMMARY(C)
    D["Details"]=Trans(C)
    d["recurring"]=D
    return d
def transT():
    file_name="data.json"
    z=send_json(file_name)
    z["transactions"]["Details"]
    a=[]
    b=[]
    D={}
    for i in z:
        a.append(float(z[i]["CurrentBalance"]))
        b.append(z[i]['valueDate'])

    D["amount"]=a
    D["date"]=b

    return  D
if __name__ == "__main__":
    transT()
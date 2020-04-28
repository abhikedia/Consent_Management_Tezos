import smartpy as sp;

class ConsentManagement(sp.Contract):
    def __init__(self):
        self.init(access = sp.map(tkey = sp.TAddress))
        
    @sp.entry_point
    def addQid(self,param):
        self.checkAddress(sp.sender)
        self.data.access[sp.sender].qid=param
        
    @sp.entry_point
    def giveConsent(self,param):
        sp.set_type(param,sp.TString)
        self.data.access[sp.sender].allowed.add(param)
        
    @sp.entry_point
    def raiseConsent(self,param):
        sp.set_type(param,sp.TString)
        sp.if (self.data.access[sp.sender].allowed.contains(param)):
            self.data.access[sp.sender].allowed.remove(param)
        
    def checkAddress(self, addr):
        sp.if ~(self.data.access.contains(addr)):
            self.data.access[addr] = sp.record(qid = "", allowed =sp.set([]))
            
@sp.add_test(name="Test")
def Test():
    scenario = sp.test_scenario()
    scenario.h1("Testing Contract")
    firstOwner = sp.address("tz1-randomAddress1")
    secondOwner = "tz1-randomAddress2"
    airline = "2020-04-16"+"BLR"+"LKO"+secondOwner
    c1=ConsentManagement()
    scenario+=c1
    
    scenario+=c1.addQid("1234").run(sender=firstOwner)
    scenario+=c1.giveConsent(airline).run(sender=firstOwner)
    scenario+=c1.raiseConsent(airline).run(sender=firstOwner)
import math, urllib, json
from BeautifulSoup import BeautifulSoup as Soup, BeautifulStoneSoup
from soupselect import select

positions = ["p", "vp", "s"]
stances = {}
valueMap = {
	"colgreencheckmark":	"for",
	"colredx":						"against",
	"colgreydouble":			"noStand",
	"colgreydash":				"NA"
}

def link(pos, cand):
	return "http://bilangpilipino.com/bilangpilipino/candidatematchupresults.php?" + "p=" + pos + "&c1=" + str(cand) + "&c2=" + str(cand) + "#resulttable"

def getCandName(page):
	return select(page, "meta[property=og:title]")[1]["content"].split(" VS ")[0].strip()

def attrSplit(s): return s.split("=\"")

def parseStance(stance):
	issue = select(stance, "div.issue div.issuetext")[0].text
	e = select(stance, "div.quotelink")[0]
	if e.text:
		attrs = map(attrSplit, e.text.split("\" quote"))
		attrMap = {}
		for attr in attrs:
			if len(attr) == 2: attrMap[attr[0]] = attr[1]
		
		value = attrMap["stand"]

		source = attrMap["src"]
		if source == "No Link": source = None

	else:
		value = e["quotestand"]
		source = e["quotesrc"]

	value = valueMap[value]

	return [issue, value, source]

def getStances(page):
	stanceMap = {}
	stances = select(page, "div#divMatchSoi div.divCanStands")
	for s in map(parseStance, stances):
		stanceMap[s[0]] = [s[1], s[2]]
	return stanceMap

for p in positions:

	# print("extracting for position " + p + ":")
	stances[p] = {}

	cand = 0
	while cand < 10:

		page = Soup(urllib.urlopen(link(p, cand)))
		name = getCandName(page)
		if not name: break

		# print("\t" + str(cand) + "\t" + name)

		stances[p][name] = getStances(page)
		cand += 1

print ("var data = " + json.dumps(stances, indent=1))

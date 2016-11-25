function isEmpty(c) {
    return c == '\n' || c === ' ' || c === '\t';
}


function XmlNode(tagname, attrline, type, content) {
    this.tagname = tagname;
    this.attrline = attrline;
    this.type = type;
    this.content = content;
}

function xmlparse(text, _prevnode, list){
    var name = '', line = '', rest = '';
    var nameStarted = false;
    var lineStarted = false;



    var currentChar, nextChar,prevChar, nodeType = 'init', innerText = '', foundNode;

    if(!list) {
        list = [];
    }
    if(_prevnode) {
        list.push(_prevnode);
    }

    for(var i = 0; i < text.length; i++) {
       currentChar = text[i];
       nextChar  = false;
        if(i > 0) {
            prevChar = text[i-1];
        }
        if(i < text.length -1) {
            nextChar = text[i+1];
        }

        if (currentChar === '<') {
            if(innerText) {
                console.log('closing inner text')
                console.log('    inner =' + innerText);
                rest = text.substring(innerText.length , text.length);
                console.log('    rest =' + rest);
                foundNode = new XmlNode('@text', '', 'text', innerText);
                if(rest){
                    return xmlparse(rest, foundNode, list);
                }

                list.push(foundNode);
                return list;
            }
            if(nextChar != '/') {
                nameStarted = true;
                lineStarted = false;
                nodeType = 'init'
            }
            else if(nextChar == '/') {
                nameStarted = true;
                lineStarted = false;
                nodeType = 'close'
            }

        }
        else if (currentChar === '/') {

            if(nodeType === 'init') {
                if(nextChar != '>') {
                    throw  new Error("unexpected end at [" + text+ ']')
                }
                nameStarted = false;

                console.log('self closing tag')
                console.log('    name =' + name);
                console.log('    line =' + line);

                rest = text.substring(i + 2, text.length);
                console.log('    rest =' + rest);
                foundNode = new XmlNode(name, line, 'selfClose')
                if(rest){
                    return xmlparse(rest, foundNode, list);
                }

                list.push(foundNode);
                return list;
            }

            else if(nodeType === 'close') {
                if(prevChar != '<') {
                    throw  new Error("unexpected start at " + text);
                }

                nameStarted = true;
            } else {
                throw  new Error("WTF???");
            }

        }

        else if(nameStarted && isEmpty(currentChar)){
            nameStarted = false;
            lineStarted = true;
            innerStarted = true;
        }
        else if (currentChar === '>') {

            // if(nodeType === 'init' ) {
            //
            // }
            nameStarted = false;
            lineStarted = false;
            console.log('closing node type' + nodeType);
            console.log('           name =' + name);
            console.log('           line =' + line);

            rest = text.substring(i + 1, text.length);
            console.log('    rest =' + rest);
            foundNode = new XmlNode(name, line, nodeType)
            if(rest){
                return xmlparse(rest, foundNode, list);
            }
            list.push(foundNode)
            return list;
        }


        else if(nameStarted) {
            name+=currentChar;
        }

        else if(lineStarted){
            line+=currentChar;
        }
        else {
            innerText+=currentChar;
        }
    }


    if(innerText) {
        foundNode = new XmlNode('@text', '', 'text', innerText);

        list.push(foundNode);
    }

    return list;


}
quixot.test.config.debug = false;
var nodes = xmlparse('<br/> sample text <div><input attributes="text"/>some data </div>');

console.log(nodes);
quixot.test.equals(nodes[0].tagname, 'br');
quixot.test.equals(nodes[0].type, 'selfClose');
quixot.test.equals(nodes[1].type, 'text');
quixot.test.equals(nodes[1].content, ' sample text ');
quixot.test.equals(nodes[2].type, 'init');
quixot.test.equals(nodes[2].tagname, 'div');
quixot.test.equals(nodes[3].tagname, 'input');
quixot.test.equals(nodes[3].attrline, 'attributes="text"');
quixot.test.equals(nodes[4].content, 'some data ');
quixot.test.equals(nodes[5].tagname, 'div');


var s = encodeURIComponent('<script src="lis/<hs.js">'); //"<script src=\"dsadsad\" id=\"ssss\">".match(/".*?"/g)
console.log(s);

nodes = xmlparse(s);
console.log(nodes);
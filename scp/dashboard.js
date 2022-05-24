var CURRENT_PATH;

var SELECTED_ELEMENT;
var SELECTED_FILE;
var IS_FILE;

function LoadDashboard() {
    LoadFile('.', false)
}

function LoadFile(name, isFile) {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.status == 200) {
            if (!isFile) {
                var data = JSON.parse(this.responseText);
                CURRENT_PATH = data.path;
                data = data.files.map(file => {
                    return '<span class="file-1kqK3V2AzEbFDYE5kvMd"><p onclick="LoadFile(\'' + file.name + '\', ' + (file.type == 'file') + ')" aria-name=\'' + file.name + '\' aria-type=\'' + file.type + '\'"><i class="fa-solid ' + ((file.type == 'directory') ? 'fa-folder' : 'fa-file-lines' ) + '"></i><span>' + 
                    file.name + '</span></p></span>'
                })
                document.getElementById('sidebar-3kucTxp78tEGI8cNF5A1').innerHTML = data.join('');
            } else {
                var data = JSON.parse(this.responseText);

                document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').innerHTML = ''

                if (data.fileType != undefined) {

                    var ELEMENT;
                    var SOURCE;

                    switch (data.fileType) {
                        case 'IMAGE':
                            ELEMENT = document.createElement('img');
                            ELEMENT.src = '/api/file/view?path=' + ParseURLQuery(((CURRENT_PATH != '' && CURRENT_PATH != undefined) ? CURRENT_PATH + '/' : '' ) + name);
                            ELEMENT.onload = (event) => {
                                ELEMENT.style.width = 'min(100%, ' + event.composedPath()[0].width + 'px)';
                                ELEMENT.style.height = 'auto';
                            }
                            break;
                        case 'AUDIO':
                            ELEMENT = document.createElement('audio');
                            SOURCE = document.createElement('source');
                            SOURCE.src = '/api/file/view?path=' + ParseURLQuery(((CURRENT_PATH != '' && CURRENT_PATH != undefined) ? CURRENT_PATH + '/' : '' ) + name);
                            ELEMENT.appendChild(SOURCE);
                            break;
                        case 'VIDEO':
                            ELEMENT = document.createElement('video');
                            SOURCE = document.createElement('source');
                            SOURCE.src = '/api/file/view?path=' + ParseURLQuery(((CURRENT_PATH != '' && CURRENT_PATH != undefined) ? CURRENT_PATH + '/' : '' ) + name);
                            ELEMENT.appendChild(SOURCE);
                            break;
                    }

                    if (ELEMENT != undefined) document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').appendChild(ELEMENT);
                    else document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').innerText = 'Could not load file. (Not implemented)';

                    document.getElementById('title-sBaKzhZkdQ3TY4OTDhed').innerText = ((CURRENT_PATH != '' && CURRENT_PATH != undefined) ? CURRENT_PATH + '/' : '' ) + name;

                    document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').contentEditable = false;

                    document.getElementById('save-c9xv8vrSaZAXGbXyRFMq').disabled = true;
                    document.getElementById('close-BqoAdfJKPLOVDrG7orIO').disabled = false;
                    return;
                }

                var body = data.file.split('\n').forEach(content => {
                    div = document.createElement('div'); 
                    div.innerText = content;

                    document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').appendChild(div);
                });
                
                document.getElementById('title-sBaKzhZkdQ3TY4OTDhed').innerText = ((CURRENT_PATH != '' && CURRENT_PATH != undefined) ? CURRENT_PATH + '/' : '' ) + name;

                document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').contentEditable = true;

                document.getElementById('save-c9xv8vrSaZAXGbXyRFMq').disabled = !data.canEdit;
                document.getElementById('close-BqoAdfJKPLOVDrG7orIO').disabled = false;

                updateContent(document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ'))
            }
        }
    }
    xhttp.open("GET", "/api/file?path=" + ParseURLQuery(((CURRENT_PATH != '' && CURRENT_PATH != undefined) ? CURRENT_PATH + '/' : '' ) + name) + '&edit=' + isFile);
    xhttp.send();
}

document.getElementById('sidebar-3kucTxp78tEGI8cNF5A1').oncontextmenu = (event) => {
    event.preventDefault();

    var CLICKED_FILE = event.composedPath().filter(element => (element.classList != undefined && element.classList.contains('file-1kqK3V2AzEbFDYE5kvMd')))[0];

    if (CLICKED_FILE != undefined) {

        SELECTED_ELEMENT = CLICKED_FILE.children[0];
        SELECTED_FILE = CLICKED_FILE.children[0].getAttribute('aria-name')
        IS_FILE = (CLICKED_FILE.children[0].getAttribute('aria-type') == 'file')

        document.getElementById('delete-RtaOmm3hW7Ax6oxNE91s').hidden = false;
        document.getElementById('download-YjMrQs845Bw3xoxdPjGc').hidden = true; // TODO
        document.getElementById('move-BkN5FyeE0IW49u7YJSHo').hidden = true; // TODO
        document.getElementById('copy-05AsY0vrsHa3FcSOD1Go').hidden = true; // TODO
        document.getElementById('rename-ltpFvgOwfbp5dDj4GWc4').hidden = false;
        document.getElementById('spacing-z91rPl2u5I4AaN3tDuaL').hidden = false;
    } else {
        document.getElementById('delete-RtaOmm3hW7Ax6oxNE91s').hidden = true;
        document.getElementById('download-YjMrQs845Bw3xoxdPjGc').hidden = true;
        document.getElementById('move-BkN5FyeE0IW49u7YJSHo').hidden = true;
        document.getElementById('copy-05AsY0vrsHa3FcSOD1Go').hidden = true;
        document.getElementById('rename-ltpFvgOwfbp5dDj4GWc4').hidden = true;
        document.getElementById('spacing-z91rPl2u5I4AaN3tDuaL').hidden = true;
    }

    document.getElementById('create-file-hnsBW1hHVtINMFpdpepp').children[1].contentEditable = false;
    document.getElementById('create-file-hnsBW1hHVtINMFpdpepp').children[1].innerText = 'Create File';

    document.getElementById('create-folder-8gzdH7oIS5hiZEIbAQ35').children[1].contentEditable = false;
    document.getElementById('create-folder-8gzdH7oIS5hiZEIbAQ35').children[1].innerText = 'Create Folder';
    
    document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI').hidden = false;
    document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI').style.left = event.clientX + 'px';
    document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI').style.top = event.clientY + 'px';
}

document.onclick = (event) => {
    if (!event.composedPath().includes(document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI'))) {
        document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI').hidden = true;
        SELECTED_ELEMENT = undefined;
        SELECTED_FILE = undefined;
        IS_FILE = undefined;
    }

    if (event.composedPath().includes(document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI'))) {
        INDEX = event.composedPath().indexOf(document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI')) - 1;
        if (INDEX >= 0 && event.composedPath()[INDEX].classList.contains('action-Wuag88l8gTI1PAEHfKMF')) {
            // if (SELECTED_FILE == undefined || SELECTED_FILE == '') {
            //     SELECTED_ELEMENT = undefined;
            //     SELECTED_FILE = undefined;
            //     IS_FILE = undefined;

            //     return document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI').hidden = true;
            // }

            switch (event.composedPath()[INDEX].id) {
                case 'delete-RtaOmm3hW7Ax6oxNE91s':
                    var xhttp = new XMLHttpRequest();
                    xhttp.onload = function() {
                        LoadFile('.', false)
                        // console.log(this.status, this.responseText)
                    }
                    xhttp.open("POST", "/api/file/delete");
                    xhttp.setRequestHeader("Content-type", "application/json");
                    xhttp.send(JSON.stringify({path: ((CURRENT_PATH != '' && CURRENT_PATH != undefined) ? CURRENT_PATH + '/' : '' ) + SELECTED_FILE, isFile: IS_FILE}));

                    SELECTED_ELEMENT = undefined;
                    SELECTED_FILE = undefined;
                    IS_FILE = undefined;

                    document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI').hidden = true;
                    break;
                case 'rename-ltpFvgOwfbp5dDj4GWc4':
                    var ELEMENT = [].slice.call(SELECTED_ELEMENT.children).filter(child => child.nodeName == 'SPAN')[0]

                    if (ELEMENT != undefined) {
                        ELEMENT.contentEditable = true;
                        ELEMENT.focus();
                        document.execCommand('selectAll', false, null);
                    }

                    SELECTED_ELEMENT = undefined;
                    SELECTED_FILE = undefined;
                    IS_FILE = undefined;

                    document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI').hidden = true;
                    break;
                case 'create-file-hnsBW1hHVtINMFpdpepp':
                    var ELEMENT = event.composedPath()[INDEX].children[1];
                    ELEMENT.innerText = 'Untitled File'

                    ELEMENT.contentEditable = true;
                    ELEMENT.focus();
                    document.execCommand('selectAll', false, null);

                    SELECTED_ELEMENT = undefined;
                    SELECTED_FILE = undefined;
                    IS_FILE = undefined;
                    break;
                case 'create-folder-8gzdH7oIS5hiZEIbAQ35':
                    var ELEMENT = event.composedPath()[INDEX].children[1];
                    ELEMENT.innerText = 'Untitled Folder'

                    ELEMENT.contentEditable = true;
                    ELEMENT.focus();
                    document.execCommand('selectAll', false, null);

                    SELECTED_ELEMENT = undefined;
                    SELECTED_FILE = undefined;
                    IS_FILE = undefined;
                    break;
            }
        }
    }
}

document.getElementById('sidebar-3kucTxp78tEGI8cNF5A1').onkeydown = (event) => {
    if (event.key == 'Enter' || event.key == 'Return') {
        event.preventDefault();
        var ELEMENT = event.composedPath().filter(element => (element.classList != undefined && element.classList.contains('file-1kqK3V2AzEbFDYE5kvMd')))[0];
        var CHILD_ELEMENT = ELEMENT.children[0];
        var NEW_NAME = [].slice.call(CHILD_ELEMENT.children).filter(child => child.nodeName == 'SPAN')[0].innerText;

        var xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            LoadFile('.', false)
            console.log(this.status, this.responseText)
        }
        xhttp.open("POST", "/api/file/rename");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({path: ((CURRENT_PATH != '' && CURRENT_PATH != undefined) ? CURRENT_PATH + '/' : '' ), oldName: CHILD_ELEMENT.getAttribute('aria-name'), name: NEW_NAME}));
    }
}

document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI').onkeydown = (event) => {
    if (event.key == 'Enter' || event.key == 'Return') {
        event.preventDefault();

        console.log(event)

        var ELEMENT = event.composedPath().filter(element => (element.classList != undefined && element.classList.contains('action-Wuag88l8gTI1PAEHfKMF')))[0];
        var IS_FILE = (ELEMENT.id == 'create-file-hnsBW1hHVtINMFpdpepp');
        var NEW_NAME = ELEMENT.innerText;

        var xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            LoadFile('.', false)
            // console.log(this.status, this.responseText)

            document.getElementById('click-menu-bYNQqkntVDZZrvq6kULI').hidden = true;
        }
        xhttp.open("POST", "/api/file/create");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({path: ((CURRENT_PATH != '' && CURRENT_PATH != undefined) ? CURRENT_PATH + '/' : '' ), name: NEW_NAME, isFile: IS_FILE}));
    }
}

document.getElementById('sidebar-3kucTxp78tEGI8cNF5A1').onpaste = (event) => {
    event.preventDefault();
}

document.getElementById('sidebar-3kucTxp78tEGI8cNF5A1').onblur = (event) => {
    LoadFile('.', false)
}

document.getElementById('close-BqoAdfJKPLOVDrG7orIO').onclick = () => {
    if (document.getElementById('close-BqoAdfJKPLOVDrG7orIO').disabled == true) return;

    document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').innerText = '';
    document.getElementById('title-sBaKzhZkdQ3TY4OTDhed').innerText = '';

    document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').contentEditable = false;

    document.getElementById('save-c9xv8vrSaZAXGbXyRFMq').disabled = true;
    document.getElementById('close-BqoAdfJKPLOVDrG7orIO').disabled = true;
}

document.getElementById('save-c9xv8vrSaZAXGbXyRFMq').onclick = () => {
    if (document.getElementById('save-c9xv8vrSaZAXGbXyRFMq').disabled == true) return;

    var body = [].slice.call(document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').children).map(child => child.innerText).join('\n');

    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        // console.log(this.status, this.responseText)
    }
    xhttp.open("POST", "/api/file");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({path: document.getElementById('title-sBaKzhZkdQ3TY4OTDhed').innerText, body}));
}

function ParseURLQuery(data) {
    data = data.replaceAll('%', '%25');
    data = data.replaceAll(' ', '%20');
    data = data.replaceAll('!', '%21');
    data = data.replaceAll('"', '%22');
    data = data.replaceAll('#', '%23');
    data = data.replaceAll('&', '%26');
    data = data.replaceAll('\'', '%27');
    data = data.replaceAll('(', '%28');
    data = data.replaceAll(')', '%29');
    data = data.replaceAll('*', '%2A');
    data = data.replaceAll('+', '%2B');
    data = data.replaceAll(',', '%2C');
    data = data.replaceAll('/', '%2F');
    data = data.replaceAll(':', '%3A');
    data = data.replaceAll(';', '%3B');
    data = data.replaceAll('<', '%3C');
    data = data.replaceAll('=', '%3D');
    data = data.replaceAll('>', '%3E');
    data = data.replaceAll('?', '%3F');
    data = data.replaceAll('@', '%40');
    data = data.replaceAll('[', '%5B');
    data = data.replaceAll('\\', '%5C');
    data = data.replaceAll(']', '%5D');
    data = data.replaceAll('^', '%5E');
    data = data.replaceAll('`', '%60');
    data = data.replaceAll('{', '%7B');
    data = data.replaceAll('|', '%7C');
    data = data.replaceAll('}', '%7D');

    return data;
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

// Ensure Text is copied as plain text not as HTML (Fixes Nested Divs Problem)
document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').addEventListener('paste', (event) => {
    event.preventDefault();
    document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
});
  
document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').addEventListener('input', (event) => {
    updateContent(event.target);
});

document.getElementById('display-content-ZXx3L3r9sPliq8FDjoYQ').onkeydown = (event) => {
    var cancelled = false;

    var CURSOR = window.getSelection();
    var PARENT = (CURSOR.getRangeAt(0).commonAncestorContainer.nodeName == '#text') ? CURSOR.getRangeAt(0).commonAncestorContainer.parentNode : CURSOR.getRangeAt(0).commonAncestorContainer;

    if (event.key == 'Backspace') {
        if (CURSOR.type == 'Caret' && CURSOR.anchorOffset == 0) {
            event.preventDefault();
            cancelled = true;

            if (PARENT.previousElementSibling) {
                var INDEX = PARENT.previousElementSibling.innerText.length;
                PARENT.previousElementSibling.innerText += PARENT.innerText;

                var SIBLING = PARENT.previousElementSibling;
                var text = SIBLING.innerText;
                if (text == '') SIBLING.innerText = '=';

                PARENT.remove();

                var RANGE = document.createRange();
                RANGE.setStart(SIBLING.childNodes[0], INDEX);
                RANGE.setEnd(SIBLING.childNodes[0], INDEX);
                RANGE.collapse(false);

                CURSOR.removeAllRanges();
                CURSOR.addRange(RANGE);

                if (text == '') SIBLING.innerText = '';
            }
        }
    } else if (event.key == 'Delete') {
        if (CURSOR.type == 'Caret') {
            event.preventDefault();
            cancelled = true;

            if (PARENT.nextElementSibling) {
                var INDEX = PARENT.innerText.length;
                PARENT.nextElementSibling.innerText = PARENT.innerText + PARENT.nextElementSibling.innerText;

                var SIBLING = PARENT.nextElementSibling;
                var text = SIBLING.innerText;
                if (text == '') SIBLING.innerText = '=';

                PARENT.remove();

                var RANGE = document.createRange();
                RANGE.setStart(SIBLING.childNodes[0], INDEX);
                RANGE.setEnd(SIBLING.childNodes[0], INDEX);
                RANGE.collapse(false);

                CURSOR.removeAllRanges();
                CURSOR.addRange(RANGE);

                if (text == '') SIBLING.innerText = '';
            }
        }
    } else if (event.key == 'Enter' || event.key == 'Return') {
        event.preventDefault();
        cancelled = true;

        if (CURSOR.type == 'Caret') {
            var INDEX = CURSOR.anchorOffset;
            var DIV = document.createElement('div');
            var text = PARENT.innerText.slice(INDEX, PARENT.innerText.length);
            DIV.innerText = (text != '') ? text : 'BLANK';
            PARENT.innerText = PARENT.innerText.slice(0, INDEX);
            PARENT.insertAdjacentElement("afterend", DIV);

            var RANGE = document.createRange();
            RANGE.setStart(DIV.childNodes[0], 0);
            RANGE.setEnd(DIV.childNodes[0], 0);
            RANGE.collapse(false);

            CURSOR.removeAllRanges();
            CURSOR.addRange(RANGE);

            DIV.innerText = (text != '') ? text : '';
        }
    } else if (event.key == 'Tab') {
        event.preventDefault();
        cancelled = true;

        if (CURSOR.type == 'Caret') {
            var INDEX = CURSOR.anchorOffset;
            var TEXT = CURSOR.baseNode.textContent;
            CURSOR.baseNode.textContent = TEXT.splice(CURSOR.anchorOffset, 0, '\t');
            CURSOR.setPosition(CURSOR.baseNode, INDEX+1)
        } else if (CURSOR.type == 'Range') {
            if (!CURSOR.rangeCount) return;
            
            var RANGE = CURSOR.getRangeAt(0);
            
            var found = 0;

            var ELEMENTS = []
            if (RANGE.startContainer.parentElement == RANGE.endContainer.parentElement) {
                ELEMENTS.push(RANGE.startContainer.parentElement)
            } else {
                ELEMENTS = [].slice.call(RANGE.commonAncestorContainer.children).filter(child => {
                    if (child == RANGE.startContainer.parentElement) {
                        found++;
                        return true;
                    }

                    if (child == RANGE.endContainer.parentElement) {
                        found++;
                        return true;
                    }

                    return (found == 1);
                })
            }
            
            ELEMENTS.forEach(elem => {
                elem.innerText = '\t' + elem.innerText;
            })

            RANGE = document.createRange();
            RANGE.setStart(ELEMENTS.at(0).childNodes[0], 0);
            RANGE.setEnd(ELEMENTS.at(-1).childNodes[0], ELEMENTS.at(-1).childNodes[0].length);

            // RANGE.collapse(false);
            CURSOR.removeAllRanges();
            CURSOR.addRange(RANGE);
        }
    }


    if (cancelled) {
        var CURSOR = window.getSelection();
        var PARENT = (CURSOR.getRangeAt(0).commonAncestorContainer.nodeName == '#text') ? CURSOR.getRangeAt(0).commonAncestorContainer.parentNode : CURSOR.getRangeAt(0).commonAncestorContainer;

        var OFFSET = $(PARENT).offset().top - $('#display-content-ZXx3L3r9sPliq8FDjoYQ').offset().top

        if (OFFSET < 0 || OFFSET > $('#display-content-ZXx3L3r9sPliq8FDjoYQ').height() - 18) {
            $('#display-content-ZXx3L3r9sPliq8FDjoYQ').scrollTop(0);
            $('#display-content-ZXx3L3r9sPliq8FDjoYQ').scrollTop($(PARENT).offset().top - $('#display-content-ZXx3L3r9sPliq8FDjoYQ').offset().top);
        }
    }
};


function updateContent(element) {
    // Remove All BR
    if (element.childNodes.length > 0) {
        for (let br of element.querySelectorAll('br')) {
            br.remove();
        }

        for (let i = 0; i < element.childNodes.length; i++) {
            const child = element.childNodes[i];

            if (child.nodeName == '#text') {
                const div = document.createElement('div');
                div.innerText = child.textContent;
                element.childNodes[i].replaceWith(div);
            }
        }
    }
  
    // If DIV is ever made empty after removal of BRs
    if (element.innerHTML.trim().length === 0) {
        // Re-populate the initial DIV
        element.innerHTML = '';
        element.appendChild(document.createElement('div'));
    }
}

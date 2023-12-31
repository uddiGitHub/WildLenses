const dropArea = document.querySelector('.drop-section')
const dropInfo = document.querySelector('.drop-info')
const invalidDrop = document.querySelector('.invalid-file')
const listSection = document.querySelector('.list-section')
const listContainer = document.querySelector('.list')
const fileInput = document.querySelector('.browse-btn')
const fileSelctorInput = document.querySelector('#file-selector-input')

fileInput.onclick = () => {
    fileSelctorInput.click()
}
fileSelctorInput.onchange = () => {
    [...fileSelctorInput.files].forEach((files) => {
        if (typeValidation(files.type)) {
            console.log(files);
            uploadFile(files)
        }
    })
}

dropArea.ondragover = (e) => {
    e.preventDefault();

    if (!dropArea.contains(e.relatedTarget)) {
        [...e.dataTransfer.items].forEach((item) => {
            if (typeValidation(item.type)) {
                dropArea.classList.add('drag-over-effect')
            }
        })
        dropInfo.style.display = 'none';
    }
}

dropArea.ondragleave = (e) => {
    if (!dropArea.contains(e.relatedTarget)) {
        dropArea.classList.remove('drag-over-effect');
        dropInfo.style.display = 'block';
    }
}

dropArea.ondrop = (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over-effect');
    dropInfo.style.display = 'block';
    if (e.dataTransfer.items) {
        [...e.dataTransfer.items].forEach((item) => {
            if (item.kind === 'file') {
                const file = item.getAsFile();
                if (typeValidation(file.type)) {
                    console.log(file)
                    uploadFile(file)
                }
            }
        })
    } else {
        [...e.dataTransfer.files].forEach((file) => {
            if (typeValidation(file.type)) {
                console.log(file)
                uploadFile(file)
            }
        })
    }
}


function typeValidation(type) {
    var validExtensions = type.split('/')[0];
    if (validExtensions === 'image') {
        return true
    } else {
        console.log('invalid file type');
        return false
    }
}


  

function uploadFile(file) {
    listSection.style.display = 'block';
    var list = document.createElement('li');
    list.classList.add('in-progress');
    list.innerHTML = `
    <div class="col">
            <img class="img-icon" src="icons/${iconSelector(file.type)}" alt="img-icon">
        </div>
        <div class="col">
            <div class="file-name">
                <div class="name">${file.name}</div>
                <span>0%</span>
            </div>
            <div class="file-progress">
                <span></span>
            </div>
        <div class="file-size">${(file.size/(1024*1024)).toFixed(2)}MB</div>
    </div>`;

    listContainer.prepend(list);

    var http = new XMLHttpRequest();
    var phpUrl = 'php/upload.php';
    var data = new FormData();
    data.append('file', file);
    http.onload = () => {
        console.log("complete")
        list.classList.add('complete');
        list.classList.remove('in-progress');
    }
    http.upload.onprogress = (e) => {
        var percent_complete = (e.loaded / e.total) * 100;
        list.querySelectorAll('span')[0].innerHTML = Math.round(percent_complete) + '%';
        list.querySelectorAll('span')[1].style.width = percent_complete + '%';
        console.log(percent_complete);
    }
    http.open('POST', phpUrl, true);
    if (data.has('file')) {
        http.send(data);
    } else {
        console.error('No file selected');
    }
}
function iconSelector(type){
    var splitType = (type.split('/')[0] == 'application') ? type.split('/')[1] : type.split('/')[0];
    return splitType + '.png'
}

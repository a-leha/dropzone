var dropzone = document.getElementById('dropzone');
var inputFile = document.getElementById('input_file');


dropzone.ondrop = function(event) {
    event.preventDefault();
    this.className = 'dropzone';

    if (event.dataTransfer.files.length > 1) {
        dropzone.placeholder = "Принимается только один файл";
        console.log('Only 1 file');
        return false;
    }

    var file = event.dataTransfer.files[0];
    var fileType = file.name.split('.').pop();

    if (file.size > 10485760) {
        dropzone.placeholder = "Допустимый размер файла 10Мб, выберите другой файл";
        console.log('Too big');
        return false;
    }

    if (fileType != 'xls' && fileType != 'xlsx') {
        dropzone.placeholder = "Недопустимый тип файла ." + fileType + ", выберите другой файл";
        console.log('Its not xls');
        this.classList.add('notXls');
        return false;
    }

    dropzone.placeholder = "Файл - " + '"' + file.name + '"';

    console.log(file);

    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function() {
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {
            type: 'binary'
        });

        wb.SheetNames.forEach(function(sheetName) {
            var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
            var jsonObj = JSON.stringify(rowObj);
            console.log(jsonObj)
        })
    };

}


dropzone.ondragover = function() {
    dropzone.classList.add('dragover');
    return false;
}
dropzone.ondragleave = function() {
    dropzone.classList.remove('dragover');
    return false;
}



dropzone.onclick = function() {

    inputFile.click();
};
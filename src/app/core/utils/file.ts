export function downloadFile(response) {
  let header_content = response.headers.get('content-disposition');
  let file = header_content.split('=')[1];
  file = file.substring(1, file.length - 1);
  let extension = file.split('.')[1].toLowerCase();
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  var newBlob = new Blob([response.body], { type: this.createFileType(extension) })

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
    (window.navigator as any).msSaveOrOpenBlob(newBlob);
    return;
  }

  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  link.href = data;
  link.download = file;
  link.click();
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(data);
  }, 400)
}

export function createFileType(e): string {
  let fileType: string = "";
  if (e == 'pdf' || e == 'csv') {
    fileType = `application/${e}`;
  }
  else if (e == 'jpeg' || e == 'jpg' || e == 'png') {
    fileType = `image/${e}`;
  }
  else if (e == 'txt') {
    fileType = 'text/plain';
  }

  else if (e == 'ppt' || e == 'pot' || e == 'pps' || e == 'ppa') {
    fileType = 'application/vnd.ms-powerpoint';
  }
  else if (e == 'pptx') {
    fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  }
  else if (e == 'doc' || e == 'dot') {
    fileType = 'application/msword';
  }
  else if (e == 'docx') {
    fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
  else if (e == 'xls' || e == 'xlt' || e == 'xla') {
    fileType = 'application/vnd.ms-excel';
  }
  else if (e == 'xlsx') {
    fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  }

  return fileType;
}

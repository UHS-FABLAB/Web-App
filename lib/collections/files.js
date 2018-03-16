Files = new FilesCollection({
  debug: true,
  storagePath: 'video',
  permissions: 0o774,
  parentDirPermissions: 0o774,
  collectionName: 'Files',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024*1024*200 && /png|mkv|mp4/i.test(file.extension)) {
      return true;
    } else {
       return 'Please upload image, with size equal or less than 10MB';
    }
  }
})

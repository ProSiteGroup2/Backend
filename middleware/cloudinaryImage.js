const cloudinary=require('cloudinary');

cloudinary.config({ 
    cloud_name: 'muthahhar97', 
    api_key: '474282459196297', 
    api_secret: 'qSV1Ga5dJXOIXMLwMDnACWz8tFw' 
  });
  
  const uploadToCloudinary = (path, folder) => {
    return cloudinary.v2.uploader
      .upload(path, { folder })
      .then((data) => {
        return { url: data.url, public_id: data.public_id };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  module.exports={uploadToCloudinary};


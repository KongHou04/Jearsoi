namespace jearsoi.Helpers
{
    public class ImageHelper
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public string imgDirectory;

        public ImageHelper(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            imgDirectory = Path.Combine(_webHostEnvironment.WebRootPath, "products");
        }

        public string GetImgUrl(string imgUrl)
        {
            // Phương thức sẽ kết hợp imgDirectory với imgUrl để tạo thành một đường dẫn ảnh hoàn chỉnh
            return Path.Combine(imgDirectory, imgUrl);
        }

        public string? CreateImg(IFormFile imgFile)
        {
            // Xử lý file ảnh
            if (imgFile != null && imgFile.Length > 0)
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imgFile.FileName);
                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "menus", fileName);

                // Lưu file vào wwwroot/menus
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    imgFile.CopyTo(stream);
                }

                // Lưu tên file vào thuộc tính imgUrl của obj
                return fileName;
            }
            return null;
        }

        public void DeleteImg(string imgFileName)
        {
            if (!string.IsNullOrEmpty(imgFileName))
            {
                var imgPath = Path.Combine(_webHostEnvironment.WebRootPath, "menus", imgFileName);
                if (File.Exists(imgPath))
                {
                    File.Delete(imgPath);
                }
            }
        }
    }

}

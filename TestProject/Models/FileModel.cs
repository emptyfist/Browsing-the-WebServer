
using System.Web.Http;
using System.Collections.Generic;

namespace TestProject.Models
{

    public class FileListResponse : ResponseModel
    {
        public List<FileInfo> FileList { get; set; }

        public class FileInfo
        {
            public string Type { get; set; }
            public string Name { get; set; }
            public long Size { get; set; }

            public FileInfo(string Type, string Name, long Size)
            {
                this.Type = Type;
                this.Name = Name;
                this.Size = Size;
            }
        }
    }

    public class FileResponse : ResponseModel
    {
    }
}
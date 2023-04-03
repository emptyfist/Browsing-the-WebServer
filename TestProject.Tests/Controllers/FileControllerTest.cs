using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Newtonsoft.Json;
using TestProject;
using TestProject.Controllers;
using TestProject.Models;

namespace TestProject.Tests.Controllers
{
    [TestClass]
    public class FileControllerTest
    {
        private string DIR_PATH = Path.Combine(Directory.GetParent(Environment.CurrentDirectory).Parent.Parent.FullName, "test_dir");

        public FileControllerTest()
        {
            if (Directory.Exists(DIR_PATH))
            {
                Directory.Delete(DIR_PATH, true);
            }

            // create test directory
            Directory.CreateDirectory(Path.Combine(DIR_PATH));

            // create test1, test2 sub directory
            Directory.CreateDirectory(Path.Combine(DIR_PATH, "test1"));
            Directory.CreateDirectory(Path.Combine(DIR_PATH, "test2"));

            // Create the file, or overwrite if the file exists.
            using (FileStream fs = File.Create(Path.Combine(DIR_PATH, "a.txt"), 1024))
            {
                byte[] info = new UTF8Encoding(true).GetBytes("This is some text in the file.");
                // Add some information to the file.
                fs.Write(info, 0, info.Length);
            }
        }

        ~FileControllerTest()
        {
            if (Directory.Exists(DIR_PATH))
            {
                Directory.Delete(DIR_PATH, true);
            }
        }

        [TestMethod]
        public void Get()
        {
            // Arrange
            FileController controller = new FileController();

            // Act
            controller.Request = new HttpRequestMessage();
            var result = controller.List();

            var response = result.ExecuteAsync(new System.Threading.CancellationToken());

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.Result.StatusCode);

            string deserialized = response.Result.Content.ReadAsStringAsync().Result;

            FileListResponse account = JsonConvert.DeserializeObject<FileListResponse>(deserialized);


            // Assert
            Assert.IsNotNull(account);
            Assert.AreEqual(true, account.Result);
            Assert.AreEqual(3, account.FileList.Count);

            FileListResponse.FileInfo file = account.FileList.ElementAt<FileListResponse.FileInfo>(0);
            Assert.AreEqual("test1", file.Name);

            file = account.FileList.ElementAt<FileListResponse.FileInfo>(1);
            Assert.AreEqual("test2", file.Name);

            file = account.FileList.ElementAt<FileListResponse.FileInfo>(2);
            Assert.AreEqual("a.txt", file.Name);


            // Test getting list from subdirectory
            controller.Request = new HttpRequestMessage();
            result = controller.List("test1");

            response = result.ExecuteAsync(new System.Threading.CancellationToken());

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.Result.StatusCode);

            deserialized = response.Result.Content.ReadAsStringAsync().Result;

            account = JsonConvert.DeserializeObject<FileListResponse>(deserialized);


            // Assert
            Assert.IsNotNull(account);
            Assert.AreEqual(true, account.Result);
            Assert.AreEqual(0, account.FileList.Count);
        }

        [TestMethod]
        public void GetFile()
        {
            // Arrange
            FileController controller = new FileController();

            // Act
            controller.Request = new HttpRequestMessage();
            HttpResponseMessage result = controller.Download("a.txt");

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
        }

        [TestMethod]
        public void Delete()
        {
            // Arrange
            FileController controller = new FileController();

            // Act
            controller.Request = new HttpRequestMessage();
            var result = controller.Delete("test2");

            var response = result.ExecuteAsync(new System.Threading.CancellationToken());

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.Result.StatusCode);

            string deserialized = response.Result.Content.ReadAsStringAsync().Result;

            FileResponse respObj = JsonConvert.DeserializeObject<FileResponse>(deserialized);

            // Assert
            Assert.IsNotNull(respObj);
            Assert.AreEqual(true, respObj.Result);

            // Test Directory after Delete

            // Act
            controller.Request = new HttpRequestMessage();
            result = controller.List();

            response = result.ExecuteAsync(new System.Threading.CancellationToken());

            // Assert
            Assert.IsNotNull(response);
            Assert.AreEqual(HttpStatusCode.OK, response.Result.StatusCode);

            deserialized = response.Result.Content.ReadAsStringAsync().Result;

            FileListResponse account = JsonConvert.DeserializeObject<FileListResponse>(deserialized);


            // Assert
            Assert.IsNotNull(account);
            Assert.AreEqual(true, account.Result);
            Assert.AreEqual(2, account.FileList.Count);

            FileListResponse.FileInfo file = account.FileList.ElementAt<FileListResponse.FileInfo>(0);
            Assert.AreEqual("test1", file.Name);

            file = account.FileList.ElementAt<FileListResponse.FileInfo>(1);
            Assert.AreEqual("a.txt", file.Name);
        }
    }
}

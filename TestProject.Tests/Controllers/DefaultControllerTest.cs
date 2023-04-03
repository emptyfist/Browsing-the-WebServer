using Microsoft.VisualStudio.TestTools.UnitTesting;
using TestProject.Controllers;

namespace TestProject.Tests.Controllers
{
    [TestClass]
    public class DefaultControllerTest
    {
        [TestMethod]
        public void Test()
        {
            // Arrange
            DefaultController controller = new DefaultController();

            // Act
            string result = controller.Test();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("test", result);
        }
    }
}

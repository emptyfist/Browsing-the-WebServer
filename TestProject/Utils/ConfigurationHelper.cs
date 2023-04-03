using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace TestProject.Utils
{
    public static class ConfigurationHelper
    {
        public static string Path;

        public static void Initialize()
        {
            Path = ConfigurationManager.AppSettings["Path"];
        }
    }
}
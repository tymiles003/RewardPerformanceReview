﻿
using System.Collections.Generic;

namespace PerformanceReview.Data.EntityFramework.Entity
{
    public class EmployeeReview : BaseEntity
    {
        public int EmployeeId { get; set; }
        public string Objectives { get; set; }
        public string OverallPerformance { get; set; }
        public string TechnicalPerformance { get; set; }
        public string DeliveringResults { get; set; }
        public string Communications { get; set; }
        public string Leadership { get; set; }
        public string Aspirations { get; set; }
        public List<Feedback> Feedback { get; set; }
    }
}

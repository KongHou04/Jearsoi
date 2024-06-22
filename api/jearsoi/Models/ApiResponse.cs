namespace jearsoi.Models
{
    public class ApiResponse
    {
        public bool IsSuccess { get; set; } = false;
        public List<string> Errors { get; set; } = new List<string>();
        public string Msg { get; set; } = string.Empty;
        public object? Data { get; set; } = null;

        public ApiResponse(bool isSuccess, List<string> errors, string msg, object? data)
        {
            IsSuccess = isSuccess;
            Errors = errors;
            Msg = msg;
            Data = data;
        }

        public ApiResponse() { }
    }
}

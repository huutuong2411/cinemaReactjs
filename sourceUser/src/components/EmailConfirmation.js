import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { http } from "../utils/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const EmailConfirmation = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Gọi API xác nhận email ở đây
      http
        .get("/confirm-account/" + token)
        .then((res) => {
          // Xác nhận email thành công, có thể hiển thị thông báo
          const token = JSON.stringify(res.data.token);
          const auth = JSON.stringify(res.data.user);

          localStorage.setItem("token", token);
          localStorage.setItem("auth", auth);
          localStorage.setItem("isLogin", true);
          navigate("/");
          toast.success("Email confirmation successful");
        })
        .catch((err) => {
          // Xác nhận email thất bại, có thể hiển thị thông báo lỗi
          toast.error("Email confirmation failed", err);
          navigate("/");
        });
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <></>;
};

export default EmailConfirmation;

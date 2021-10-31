var express = require("express");
const fetch = require("cross-fetch");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async (req, res, next) => {
  const email = req.body.Email;
  const password = req.body.Password;
  const r = await fetch(
    "https://function-project-portal-backend-prod.azurewebsites.net/api/authentication/LoginWithEmailandPassword",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,la;q=0.8,fa;q=0.7",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua":
          '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        Referer: "https://t.appdomain.org/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `{"Email":"${email}","Password":"${password}"}`,
      method: "POST",
    }
  );
  const data = await r.json();
  const r2 = await fetch(
    "https://function-project-portal-backend-prod.azurewebsites.net/api/authentication/LoginWithCustomToken",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,la;q=0.8,fa;q=0.7",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua":
          '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        Referer: "https://t.appdomain.org/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `{"Api":"https://us-central1-projects-sight-prod.cloudfunctions.net/api/api/user/getTeammemberToken","Token":"${data.idToken}"}`,
      method: "POST",
    }
  );
  const data2 = await r2.json();
  res.send(data2);
});

module.exports = router;

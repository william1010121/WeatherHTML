# 錯誤報告：空氣品質資料刪除權限問題 (Cookie 驗證模式)

## 概述
本報告記錄了使用使用者 `yolko` 透過標準 Cookie 驗證機制 (不使用額外 Header 帶入帳密) 測試 Air Quality API `DELETE` 端點的過程。

測試證實，雖然 API 支援標準 Cookie 驗證並允許該使用者讀取與新增資料，但在執行 `DELETE` 操作時，即使 Cookie 有效，仍會失敗並傳回 `401 Unauthorized` 錯誤。

**日期:** 2026-01-07
**使用者帳號:** `yolko` (Role: 1)
**Base URL:** `https://meteo.local2.tempestdigi.com`

---

## 1. 登入並取得 Cookie (成功)
首先透過登入接口取得 Session Cookie，並儲存於 `cookie_test.txt`。

**指令:**
```bash
curl -k -c cookie_test.txt -X POST https://meteo.local2.tempestdigi.com/api/Account/login \
  -H "Content-Type: application/json" \
  -d '{"account": "yolko", "password": "yolko123"}'
```

**回應:**
```json
HTTP/2 200
{"userId":"69254bc7153127b681676dac","role":1,"account":"yolko","nickname":"yolko"}
```
> **狀態:** 登入成功，已取得 Cookie。

---

## 2. 讀取列表 (成功 - 僅使用 Cookie)
使用上一步取得的 Cookie 進行請求，不帶 `X-Account` 等 Header。

**指令:**
```bash
curl -k -b cookie_test.txt -X POST https://meteo.local2.tempestdigi.com/api/AirQuality/list \
  -H "Content-Type: application/json" \
  -H "ngrok-skip-browser-warning: true" \
  -d '{"pageIndex": 1, "pageSize": 5}'
```

**回應:**
```json
HTTP/2 200
{
  "rows": [ ... ],
  "totalRowCount": 5
}
```
> **狀態:** Cookie 驗證有效，可讀取列表。

---

## 3. 新增資料 (成功 - 僅使用 Cookie)
測試是否能僅憑 Cookie 權限新增資料。

**指令:**
```bash
curl -k -b cookie_test.txt -X POST https://meteo.local2.tempestdigi.com/api/AirQuality \
  -H "Content-Type: application/json" \
  -H "ngrok-skip-browser-warning: true" \
  -d '{"detectedAtUtc": "2026-01-08T00:00:00Z", "pm_25": 20}'
```

**回應:**
```
HTTP/2 200 OK
```
> **狀態:** 新增成功 (產生 ID: `695d4e21e46bf8e32f2a2a2c`)。證明此帳號具備寫入權限，且 Cookie 機制運作正常。

---

## 4. 刪除資料 (失敗 - 僅使用 Cookie)
嘗試刪除剛剛透過 Cookie 驗證新增的資料。

**指令:**
```bash
curl -k -v -b cookie_test.txt -X DELETE "https://meteo.local2.tempestdigi.com/api/AirQuality?id=695d4e21e46bf8e32f2a2a2c" \
  -H "ngrok-skip-browser-warning: true"
```

**回應:**
```
< HTTP/2 401 
< server: openresty
< date: Tue, 06 Jan 2026 18:02:24 GMT
< content-length: 0
```

### 觀察結果
- 伺服器回傳 **401 Unauthorized**。
- 由於 List 和 Add 操作僅使用 Cookie 均能成功，這排除了「必須使用 Header 驗證」的可能性。
- **結論:** 再次確認問題核心在於使用者角色 `1` (一般使用者) 在 `DELETE` 端點上的權限設定不足，而非驗證方式 (Cookie vs Header) 的問題。

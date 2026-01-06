# BackEnd Operations

This file lists all API operations extracted from `swagger.json`, grouped by tags.

## Account
- **POST** `/api/Account/register` (OperationId: `Register`)
- **POST** `/api/Account/login` (OperationId: `Login`)
- **GET** `/api/Account/info` (OperationId: `GetIsLogin`)
- **GET** `/api/Account/logout` (OperationId: `Logout`)
- **PATCH** `/api/Account/block` (OperationId: `BlockAccount`)
- **PATCH** `/api/Account/unblock` (OperationId: `UnblockAccount`)

## AirQuality
- **POST** `/api/AirQuality/list` (拿取空品資料列表)
- **POST** `/api/AirQuality` (新增單筆空品資料)
- **PUT** `/api/AirQuality` (修改單筆空品資料)
- **DELETE** `/api/AirQuality` (刪除單筆空品資料)

## Log
- **POST** `/api/Log/list`

## LoginHistory
- **POST** `/api/LoginHistory/list`

## User
- **GET** `/api/User/{userId}`
- **DELETE** `/api/User/{userId}`
- **POST** `/api/User/list`
- **POST** `/api/User`
- **PATCH** `/api/User`

## Weather_Auto
- **POST** `/api/weather/auto/list` (拿取天氣資料列表)
- **POST** `/api/weather/auto` (新增單筆天氣資料)
- **PUT** `/api/weather/auto` (修改單筆天氣資料)
- **DELETE** `/api/weather/auto` (刪除單筆天氣資料)

## Weather_CWA
- **GET** `/api/weather/cwa/CODiSApiTest` (簡單、快速拉取 CWA CODiS 網頁 API)
- **POST** `/api/weather/cwa/list`
- **POST** `/api/weather/cwa`
- **PUT** `/api/weather/cwa`
- **DELETE** `/api/weather/cwa`

## Weather_Manual
- **POST** `/api/weather/manual/list`
- **POST** `/api/weather/manual`
- **PUT** `/api/weather/manual`
- **DELETE** `/api/weather/manual`

---
title: "Markdown test in Astro"
date: 2023-10-27
description: "Đây là tài liệu dùng để kiểm tra khả năng render Markdown của project Astro."
slug: 'test-post'
author: "Astro Developer"
---

# Markdown Syntax Test Case (H1)

Chào mừng bạn đến với file kiểm tra toàn diện các tính năng của Markdown. File này được thiết kế để kiểm tra khả năng hiển thị của trình xem Markdown.

## Cấp độ Tiêu đề (Headings) - H2
### Tiêu đề cấp 3 - H3
#### Tiêu đề cấp 4 - H4
##### Tiêu đề cấp 5 - H5
###### Tiêu đề cấp 6 - H6

---

## Định dạng Văn bản (Emphasis)

*Đây là văn bản in nghiêng* (Dấu sao)

**Đây là văn bản in đậm** (Dấu sao)

***Văn bản vừa đậm vừa nghiêng***

~~Văn bản bị gạch ngang (Strikethrough)~~

---

<details>
  <summary>Click để mở</summary>

  Nội dung ẩn ở đây 👀  
  Có thể chứa **Markdown bình thường**

</details>

## Danh sách (Lists)

### Danh sách không thứ tự
* Mục thứ nhất
* Mục thứ hai
    * Mục con A
    * Mục con B
* Mục thứ ba

### Danh sách có thứ tự
1. Bước một
2. Bước hai
    1. Bước 2a
    2. Bước 2b
3. Bước ba

### Danh sách kiểm tra (Task List)
- [x] Tính năng đã hoàn thành
- [ ] Tính năng đang chờ
- [ ] Tính năng bị hủy

---

## Liên kết và Hình ảnh (Links & Images)

[Đây là liên kết đến Google](https://www.google.com)

Hình ảnh kèm văn bản thay thế:
![Logo Markdown](https://markdown-here.com/img/icon256.png)

---

## Trích dẫn (Blockquotes)

> Đây là một khối trích dẫn.
>
> “One must imagine Sisyphus happy.” - Albert Camus, Le Mythe de Sisyphe
>> Đây là trích dẫn lồng nhau cấp 2.

---

## Mã nguồn (Code)

Sử dụng `code inline` để đánh dấu biến hoặc lệnh ngắn trong dòng.

### Khối mã (Code Blocks)

```rust
// Kiểm tra cú pháp Rust
fn main() {
    println!("Chào mừng bạn đến với thế giới Rust!");
    let x = 42;
    match x {
        42 => println!("Câu trả lời cho mọi thứ."),
        _ => println!("Không xác định."),
    }
}
---
title: "Zig Learning Devlog (Phần 1)"
date: 2026-5-11
description: "Learn zig so i can be good in programming xD"
slug: "learn-zig-part-1"
---
Nếu cách tiếp cận của Rust là 
> Make it hard to write bad code

thì cách tiếp cận của Zig sẽ là
> Make it easy to write good code

Dù ecosystem của Zig chưa hoàn thiện lắm. Đến giờ Zig vẫn chưa release 1.0, mới chỉ là 0.16.0 ở thời điểm mình viết bài này), nhưng mình vẫn sẽ học ngôn ngữ này và dùng nó cho những project cá nhân.

> Đây là note học của tôi thôi
## Khởi tạo biến trong Zig

Sử dụng 1 trong 2 keyword sau: `const` hoặc `var`

Const dùng cho biến không thay đổi (immutable), `var` dùng cho biến có giá trị muốn thay đổi về sau

Biến trong Zig có tính năng gọi là Type inference. Nghĩa là khi gán giá trị nó cũng sẽ tự suy kiểu.

Compiler của Zig sẽ check khi mình cố tình thay đổi biến có keyword `const`

```zig
const ss = 123;
// Dòng bên dưới sẽ không hợp lệ
ss = 22;
```

Có thề dùng `var` nếu mình muốn thay đổi giá trị biến, lưu ý là phải khai báo cả kiểu dữ liệu sẽ dùng khi dùng `var` nếu không sẽ có lỗi khi biên dịch. Điều này để tránh việc kiểu dữ liệu không rõ ràng.

```zig
var ss : u8 = 123;
ss = 22;
```
### Khai báo không có giá trị khởi tạo

- Sử dụng keyword `undefined` nhưng mà nên hạn chế
```zig
var ss : u8 = undefined;
ss = 123;
```
### Mọi biến khởi tạo đều cần được sử dụng
```zig
const ss = 123;
```

```zig
t.zig:4:11: error: unused local constant const ss = 123; ^~~
```
`
Khi khởi tạo biến thì có hai lựa chọn:
- Sử dụng giá trị của biến đó
- Loại bỏ giá trị bằng dấu `__` như ví dụ bên dưới
```zig
const ss = 123;
_ = ss;
```

Giá trị khởi tạo bằng keyword `var` thì cần phải được thay đổi (mutate) về sau, nếu không sẽ có cảnh báo khi biên dịch (do Zig khuyến khích sử dụng biến dạng `const` , trừ khi biến đó thật sự có giá trị cần được thay đổi về sau)

## Các kiểu dữ liệu

Quá lười để viết, vì cơ bản nó khá giống Rust nhưng có thêm các kiểu dữ liệu để giao tiếp với C ABI
https://ziglang.org/documentation/master/#Primitive-Types

## Array (Mảng)
Tạo mảng trong Zig chịu ảnh hưởng bởi cú pháp của C

```zig
const arr = [4]u8{48,12,36,11};
const ls = [_]f64{36.63, 96.69, 420.69};
```
Mảng trong Zig không thể kết hợp các kiểu dữ liệu lại với nhau (ví dụ như mix số thực với số nguyên, kiểu vậy).

Khi khai báo độ dài mảng, có thể dùng kí tự `_` để trình biên dịch tự suy độ dài.

Lưu ý đây là mảng tĩnh, tức là độ dài mảng không thay đổi được (khai báo bao nhiêu dùng bấy nhiêu)

## Truy cập giá trị trong mảng 

Dùng cặp ngoặc `[]`  + index (ví dụ arr`[0]` arr `[1]`).

Zig là 0-based index, tức index chỉ phần tử đầu tiên của mảng là 0

Có thể truy cập 1 phần của mảng sử dụng range selector.
Cú pháp là `start..end` , lưu ý là phần end không được bao gồm trong các giá trị được truy cập. Ví dụ như là 1..3 thì chỉ lấy phần tử ở `[1] và [2]` thôi

```zig
const arr = [4]u8{1,2,3,4};
const slices = arr[1..3];

// slices
{ 2, 3 }
```

Một vài pattern:
- Lấy từ đầu mảng đến cuối mảng: `0...arr.len hoặc `0..`
```zig
const arr = [4]u8{1,2,3,4};
const slices = arr[0..arr.len];

// slices
{ 1, 2, 3, 4 }
```
- Lấy từ index nhất định đến cuối mảng: idx.. 
```zig
const arr = [4]u8{48, 24, 12, 6};
const slice = arr[1..];

// Slice
{ 24, 12, 6 }
```

- Slices bản chất là 1 cặp giá trị `[*]T` (con trỏ tới dữ liệu) và `usize`(số lượng phần tử)

Vì có `usize` nên Zig compiler có thể dễ dàng kiểm tra xem mình có truy cập ra ngoài index của mảng (out of bound) không.

## Toán tử của mảng
Gồm 2 toán tử
- Toán tử cộng mảng `++`. Thường được dùng để nối chuỗi (string)
```zig
const a = [_]u8{1,2,3};
const b = [_]u8{4,5};
const c = a ++ b;
// c = { 1, 2, 3, 4, 5 }
```
- Toán tử nhân mảng `**`
```zig
const a = [_]u8{11,22,33};
const c = a ** 2;
// c = { 11, 22, 33, 11, 22, 33 }
```
Chỉ hoạt động khi biết được kích thước của toán hạng lúc biên dịch (compile-time known)

# Chuỗi trong Zig

- Là một mảng `u8` (unsigned 8-bit integer)
- An toàn hơn `C`, ở ngôn ngữ `C` khi mình muốn biết mảng đã kết thúc hay chưa thì phải lặp cho đến khi gặp phần tử chứa `null character` (giá trị là `'\0'`). Trong khi đó Zig có sẵn độ dài của mảng rồi.
- Chuỗi trong Zig mặc định là UTF-8 encoded

## Slice và sentinel-terminated array

Mọi giá trị chuỗi trong Zig được lưu trữ dưới dạng 1 chuỗi byte trong bộ nhớ. Nhưng có 2 cách thường được sử dụng là
- Sentinel-terminated array 
- Slice

## [Sentinel-terminated array](https://ziglang.org/documentation/master/#Sentinel-Terminated-Arrays) 

Về cơ bản là một mảng bình thường nhưng sẽ có 1 giá trị ở index cuối của mảng.

Ví dụ như 1 mảng sau 
```zig
// This is a string literal value:
_ = "A literal value";
try stdout.print("{any}\n", .{@TypeOf("A literal value")});
try stdout.flush();

// Kết quả trả về
*const [15:0]u8
```

Kiểu dữ liệu trả về là `*const [n:0]u8`. Ta nói ta có một mảng `u8` với chiều dài `n` với phần tử ở index thứ `n` có giá trị là 0. Cái này khá giống ngôn ngữ C, cụ thể hơn là null-terminated array với giá trị ở index cuối cùng là `NULL` , mà `NULL` trong C lại bằng 0.

Hiểu cơ bản là mảng dạng này sẽ có dạng như sau
```zig
arr[_:0]u8{1,2,3,4};

Ở chương trình {1,2,3,4}
Bộ nhớ thực tế sẽ là { 1, 2, 3, 4, 0}
// 0 ở dây chính là giá trị sentinel
```

Sentinel thường được dùng trong C nhằm nhận biệt khi nào mảng đã kết thúc. Ở đây do Zig là một ngôn ngữ có thể kết hợp được với C nên mới có kiểu dữ liệu này.
### Slice 

Như đã nói ở trên, btw syntax nó khá giống Rust
```zig
const str: []const u8 = "A string value";
try stdout.print("{any}\n", .{@TypeOf(str)});
try stdout.flush();

// Kết quả trả về 
[]const u8
```

> @TypeOf dùng để check giá trị của kiểu dữ liệu

## Byte và unicode point
Mã hóa dạng UTF-8 hoạt động bằng cách gán một số (gọi là unicode point) cho một kí tự. Ví dụ như kí tự "A" được lưu trữ trong UTF-8 dưới dạng số thuộc hệ thập phân (ở đây là số 65). Vậy thì ngược lại, số 65 cũng là unicode point của ký tự "A"

Nhưng với những kí tự đặc biệt, ví dụ như kí tự 'Ⱥ' được biểu diễn dưới dạng số là 570. Nhưng 570 lại lớn hơn 255 (kích thước của 1 byte - 255). Thế nên unicode point 570 sẽ được lưu trữ dưới dạng 2 byte là `C8` và `BA`.
```zig
const std = @import("std");
pub fn main(init: std.process.Init) !void {
    var stdout_buffer: [1024]u8 = undefined;
    var stdout_writer = std.Io.File.stdout().writer(init.io, &stdout_buffer);
    const stdout = &stdout_writer.interface;
    const string_object = "Ⱥ";
    _ = try stdout.write(
        "Bytes that represents the string object: "
    );
    for (string_object) |char| {
        try stdout.print("{X} ", .{char});
    }
    try stdout.flush();
}
```

```
Bytes that represents the string object: C8 BA 
```

Một trường hợp khác là kí tự `Á`, dạng số là 193 < 255. Nhưng vì UTF-8 không lưu trữ các kí tự khác ngoài ASCII nên nó được lưu trữ dưới dạng 2 byte là `C3` và `81`

Quay lại vấn đề, vì 1 kí tự lại có thể dài 2 byte, thế nên khi sử dụng vòng lặp với `string` ,đôi khi mình chỉ muốn làm việc với kí tự thôi chứ không phải byte. Nên cần lưu ý để tránh điều này

Note: có thể sử dụng `std.unicode.Utf8View` để tạo iterator lặp qua unicode code points của chuỗi
Ví dụ ta có chuỗi あの百合の花を思い出す, mỗi kí tự chứa 3 byte: 

```zig
const std = @import("std");
pub fn main(init: std.process.Init) !void {
    var stdout_buffer: [1024]u8 = undefined;
    var stdout_writer = std.Io.File.stdout().writer(init.io, &stdout_buffer);
    const stdout = &stdout_writer.interface;
    var utf8 = try std.unicode.Utf8View.init("あの百合の花を思い出す");
    var iterator = utf8.iterator();
    while (iterator.nextCodepointSlice()) |codepoint| {
        try stdout.print(
            "got codepoint {x}\n",
            .{codepoint},
        );
    }

    try stdout.flush();
}
```

```zig
got codepoint e38182
got codepoint e381ae
got codepoint e799be
got codepoint e59088
got codepoint e381ae
got codepoint e88ab1
got codepoint e38292
got codepoint e6809d
got codepoint e38184
got codepoint e587ba
got codepoint e38199
```

Thay vì nó lặp `3*11 = 33` lần thì ở đây chỉ lặp 11 lần (11 kí tự)

Nay học tới đây thôi, sẽ còn thêm.
---
Tuổi mới nên phải thay đổi thôi, haizz.

**Tài liệu mình sử dụng:**

[Zig Official Docs](https://ziglang.org/documentation/master/)

[Introduction to Zig](https://pedropark99.github.io/zig-book/)
/**
 * @description test demo
 * @author Thanatos
 */

function sum(a, b) {
    return a + b
}

test('40 + 10 等于 50', () => {
    const res = sum(40, 10)
    expect(res).toBe(50)
})

test('10 + 20 不等于 40', () => {
    const res = sum(10, 20)
    expect(res).not.toBe(40)
})
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var removeNodes = function (head) {
  let cur = head;
  while (cur && cur.next) {
    if (cur.val < cur.next.val) {
      if (cur.prev) {
        cur.prev.next = cur.next;
        cur = cur.prev;
      } else {
        cur.next.prev = null;
        head = cur = cur.next;
      }
    } else {
      cur.next.prev = cur;
      cur = cur.next;
    }
  }
  return head;
};

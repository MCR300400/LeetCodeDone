class Solution(object):
    def isAnagram(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: bool
        """
        if len(s) != len(t):
            return False
        t = list(t)
        for x in s:
            if x in t:
                t.remove(x)
            else:
                return False
        return True

            
        
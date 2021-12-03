<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="@*|node()">
        <xsl:apply-templates select="section"></xsl:apply-templates>
    </xsl:template>
    <xsl:template match="section">
        <a href="#{@id}">
            <xsl:value-of select="@id"/>
        </a>
    </xsl:template>
</xsl:stylesheet>
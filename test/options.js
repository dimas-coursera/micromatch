/*!
 * micromatch <https://github.com/jonschlinkert/micromatch>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var path = require('path');
var should = require('should');
var mm = require('..');

describe('options', function () {
  describe('.match()', function () {
    it('should support the `matchBase` option:', function () {
      mm.match(['a/b/c/foo.md'], '*.md').should.eql([]);
      // mm(['a/b/c/foo.md'], '*.md', {matchBase: true}).should.eql();
    });

    it('should support the `nocase` option:', function () {
      mm.match(['a/b/d/e.md'], 'a/b/c/*.md').should.eql([]);
      mm.match(['a/b/c/e.md'], 'A/b/C/*.md').should.eql([]);
      mm.match(['a/b/c/e.md'], 'A/b/C/*.md', {nocase: true}).should.eql(['a/b/c/e.md']);
      mm.match(['a/b/c/e.md'], 'A/b/C/*.MD', {nocase: true}).should.eql(['a/b/c/e.md']);
    });

    it('should match dotfiles when `dotfile` is true:', function () {
      mm.match(['.gitignore'], '.gitignore', {dot: true}).should.eql(['.gitignore']);
      mm.match(['foo.md'], '*.md', {dot: true}).should.eql(['foo.md']);
      mm.match(['.verb.txt'], '*.md', {dot: true}).should.eql([]);
      mm.match(['a/b/c/.gitignore'], '*.md', {dot: true}).should.eql([]);
      mm.match(['a/b/c/.gitignore.md'], '*.md', {dot: true}).should.eql([]);
      mm.match(['.verb.txt'], '*.md', {dot: true}).should.eql([]);
      mm.match(['.gitignore'], '*.md', {dot: true}).should.eql([]);
      mm.match(['.gitignore'], '*.*', {dot: true}).should.eql(['.gitignore']);
      mm.match(['.gitignore.md'], '*.md', {dot: true}).should.eql(['.gitignore.md']);
      mm.match(['a/b/c/.gitignore.md'], '*.md').should.eql([]);
      mm.match(['a/b/c/.gitignore.md'], '**/*.md').should.eql(['a/b/c/.gitignore.md']);
      // mm(['a/b/c/.gitignore.md'], '**/.*.md').should.eql();
      // mm(['a/b/c/.gitignore.md'], '**/.*').should.eql();
      // mm(['a/b/c/.verb.md'], '**/*.md', {dot: true}).should.eql();
    });
  });
});